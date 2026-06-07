import { createRsvpManual, deleteRsvp } from "@/app/actions";
import { Badge, DateCell, MetricCard, PageHeader } from "@/components/ui";
import { getRsvps } from "@/lib/data";

type PageProps = {
  searchParams?: Promise<{ saved?: string }>;
};

export const dynamic = "force-dynamic";

export default async function RsvpsPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const saved = params.saved;
  const rsvps = await getRsvps();
  const totalPeople = rsvps.reduce((sum, r) => sum + (r.party_size || 1), 0);

  return (
    <div className="page">
      <PageHeader
        title="Friday Trip RSVPs"
        description="Everyone confirmed for the launch party trip. Public RSVPs and the people you invited directly, all in one headcount."
      />

      {saved === "rsvp-added" && <p className="success-banner">RSVP added.</p>}
      {saved === "rsvp-removed" && <p className="success-banner">RSVP removed.</p>}

      <div className="card-grid compact-cards">
        <MetricCard label="People coming" value={totalPeople} note="Total seats across all parties." />
        <MetricCard label="RSVPs" value={rsvps.length} note="Number of separate replies." />
      </div>

      <section className="panel">
        <h3>Add someone manually</h3>
        <p className="small" style={{ marginBottom: 12 }}>
          Use this for friends you invited directly who won&apos;t fill out the form.
        </p>
        <form action={createRsvpManual} className="form-grid compact">
          <div className="field">
            <label htmlFor="rsvp-name">Full name</label>
            <input id="rsvp-name" name="full_name" required />
          </div>
          <div className="field">
            <label htmlFor="rsvp-email">Email (optional)</label>
            <input id="rsvp-email" name="email" type="email" />
          </div>
          <div className="field">
            <label htmlFor="rsvp-party">Party size</label>
            <input id="rsvp-party" name="party_size" type="number" min={1} max={20} defaultValue={1} />
          </div>
          <div className="field" style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="rsvp-notes">Notes</label>
            <input id="rsvp-notes" name="notes" placeholder="Optional" />
          </div>
          <div className="actions" style={{ gridColumn: "1 / -1" }}>
            <button className="button" type="submit">Add to list</button>
          </div>
        </form>
      </section>

      <section className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Party size</th>
              <th>Source</th>
              <th>Notes</th>
              <th>RSVP&apos;d</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rsvps.length === 0 ? (
              <tr>
                <td colSpan={7} className="small" style={{ color: "var(--text-soft)" }}>
                  No RSVPs yet.
                </td>
              </tr>
            ) : (
              rsvps.map((rsvp) => (
                <tr key={rsvp.id}>
                  <td><strong>{rsvp.full_name}</strong></td>
                  <td>{rsvp.email || "—"}</td>
                  <td>{rsvp.party_size}</td>
                  <td>
                    <Badge
                      label={rsvp.source === "manual" ? "invited" : "form"}
                      tone={rsvp.source === "manual" ? "warning" : "success"}
                    />
                  </td>
                  <td>{rsvp.notes || "—"}</td>
                  <td><DateCell value={rsvp.created_at} /></td>
                  <td>
                    <form action={deleteRsvp}>
                      <input type="hidden" name="id" value={rsvp.id} />
                      <button
                        className="ghost-button"
                        type="submit"
                        style={{ color: "var(--danger)", fontSize: "0.82rem" }}
                      >
                        Remove
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
