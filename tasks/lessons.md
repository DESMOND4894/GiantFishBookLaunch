# Lessons — BOOK LAUNCH

## 2026-04-16 — Shipped with no real auth, no RLS, no role separation, unverified public forms

### What went wrong
The site was built with a single shared HTTP Basic Auth password as the entire auth story, `SUPABASE_SERVICE_ROLE_KEY` used as the default Supabase client in every server action and data read, and four public endpoints (`/claim`, `/submit-review`, `/join-launch-team`, `/proof-of-purchase`) with zero verification, rate limiting, or captcha. Specific failures:

- `/submit-review` flipped `launch_party_confirmed = true` on any launch-team row matching a typed email → strangers could confirm party spots for members who never agreed.
- `/join-launch-team` auto-emailed the ARC PDF to any typed address → effectively piracy via form submission.
- Every authed server action in [app/actions.ts](../app/actions.ts) used the service-role client with no caller check — anyone with the shared password could `deleteLaunchTeamMember`, `updateSettings`, `sendArcPdfToMember(anyEmail)`, `sendCoupon(anyEmail)`.
- `sendArcEmail` / `sendCouponEmail` in [lib/resend.ts](../lib/resend.ts) accepted arbitrary caller-supplied `to:` addresses → spam cannon with Des's From address.
- Every table had `ENABLE ROW LEVEL SECURITY` but zero `CREATE POLICY` statements → RLS was cosmetic; service-role client bypassed it anyway.
- `/admin/coupons` had no admin role check despite the path name.
- `activity_log.created_by` was hardcoded to `"admin"` at [app/actions.ts:22](../app/actions.ts#L22) → no real audit trail.
- Des's global `CLAUDE.md` already specified Supabase Auth with a `user_roles` table (admin/staff/customer). That instruction was read and ignored.

### Why it happened (root cause — not the bugs, the process)

1. **No threat model was ever written.** No `SECURITY.md`, no list of actors/assets/invariants. Features got built; risks didn't.
2. **Edge auth was treated as total auth.** Basic Auth gives no identity, no role split, no accountability. It's a velvet rope, not a lock.
3. **Service role key used as the default client** — the easy path ("give everything admin rights so it works") became the only path. Supabase's security layer was effectively off.
4. **Public forms written as "trust everyone"** — no category of decision about proof-of-identity ever occurred.
5. **Global CLAUDE.md instruction ignored** — the roles table spec was sitting in the rule file the whole time.
6. **No security review gate before shipping** — no curl sweep, no `BUILD_LOG.md` entry, no CI check.
7. **Zero defense-in-depth** — one layer (edge auth), done. Shared-password leak or env-var blank = fully open.

### Rule to follow going forward

See `/Users/desmondosullivan/.claude/CLAUDE.md` → "Security Rules — Non-Negotiable" section (added 2026-04-16) and Golden Rule #10. Twelve hard rules plus a blocking pre-done checklist. Summary:

- Edge auth ≠ auth. Handler-level identity check required on every sensitive route/action.
- Service role key is server-to-server only. Anon client is the default; admin client is only reachable after `requireAdmin()`.
- RLS requires explicit policies in the same migration as the table.
- Public forms never auto-email user-supplied addresses and never flip state on someone else's record.
- Role system (`user_roles`) from day one — in the first migration.
- `SECURITY.md` threat model exists before the first form ships.
- Defense in depth: at least two layers between public and data.
- Actions audit the caller (not just input). Outbound mail reads `to:` from the stored record, never from caller input.
- Upload endpoints self-gate with `requireAdmin()` — never rely on middleware alone.
- Before calling auth-related work "done": logged-out `curl` sweep against every write endpoint must return 401, logged in as non-admin must return 403, and the result is logged in `BUILD_LOG.md`.

Persistent memory: `/Users/desmondosullivan/.claude/projects/-Users-desmondosullivan-Desktop-AI-PROJECTS-BOOK-LAUNCH/memory/feedback_security_defaults.md`.
