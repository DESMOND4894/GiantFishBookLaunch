insert into public.app_settings (id, launch_target_date, launch_phase, admin_contact, memorial_day_note)
values
  (1, date '2026-05-04', 'launch_week', 'Des O''Sullivan', 'Book launch moved to May 4, 2026.')
on conflict (id) do update
set
  launch_target_date = excluded.launch_target_date,
  launch_phase = excluded.launch_phase,
  admin_contact = excluded.admin_contact,
  memorial_day_note = excluded.memorial_day_note;

insert into public.launch_tasks (title, description, category, phase, status, priority, owner, due_date, notes)
values
  ('Finalize command center spec', 'Lock the operating model and required modules.', 'build', 'foundation', 'done', 'high', 'Skipper', date '2026-03-31', 'Starter task from spec'),
  ('Confirm May 4 launch date', 'Confirm the book listing and launch timing for May 4, 2026.', 'ops', 'foundation', 'in_progress', 'critical', 'Des', date '2026-04-05', 'Default target is May 4, 2026.'),
  ('Build launch team list', 'Create initial prospect list.', 'launch_team', 'recruitment', 'not_started', 'high', 'Skipper', date '2026-04-07', null),
  ('Draft launch team invitation copy', 'Prepare draft-only invitation language for approval.', 'launch_team', 'recruitment', 'not_started', 'high', 'Skipper', date '2026-04-08', null),
  ('Draft ARC instructions', 'Prepare instructions for readers receiving the advance copy.', 'launch_team', 'arc', 'not_started', 'medium', 'Skipper', date '2026-04-10', null),
  ('Create proof-of-purchase form', 'Public upload flow for raffle entry and manual coupon fulfillment.', 'build', 'foundation', 'in_progress', 'critical', 'Skipper', date '2026-04-02', null),
  ('Draft launch email #1', 'Primary launch announcement.', 'content', 'content', 'not_started', 'high', 'Skipper', date '2026-04-20', null),
  ('Draft launch email #2', 'Secondary launch follow-up.', 'content', 'content', 'not_started', 'medium', 'Skipper', date '2026-04-27', null),
  ('Draft launch email #3', 'Late launch sequence email.', 'content', 'launch_week', 'not_started', 'medium', 'Skipper', date '2026-05-18', null),
  ('Draft Father''s Day email', 'Prepare post-launch Father''s Day push.', 'content', 'fathers_day', 'not_started', 'medium', 'Skipper', date '2026-05-28', null),
  ('Build outreach target list', 'Assemble podcasts, media, faith, fishing, wellness, and reviewer targets.', 'outreach', 'outreach', 'not_started', 'high', 'Skipper', date '2026-04-12', null),
  ('Build content calendar for April/May', 'Set schedule for email and social content.', 'content', 'content', 'not_started', 'high', 'Skipper', date '2026-04-14', null),
  ('Define raffle rules', 'Document the raffle process for verified purchases.', 'ops', 'foundation', 'not_started', 'high', 'Des', date '2026-04-10', null),
  ('Define manual coupon fulfillment SOP', 'Document the manual coupon workflow for verified buyers.', 'ops', 'foundation', 'not_started', 'high', 'Skipper', date '2026-04-10', null);

insert into public.launch_team_members (full_name, email, source, category, status, invited_at, agreed_to_read_review, agreed_at, follow_up_due, notes)
values
  ('Casey Rivers', 'casey@example.com', 'Existing CQ customer', 'cq_customer', 'agreed', timezone('utc', now()), true, timezone('utc', now()), date '2026-04-10', 'Strong fit for ARC and testimonial'),
  ('Mara Bennett', 'mara@example.com', 'Family friend', 'friend', 'invited', timezone('utc', now()), false, null, date '2026-04-09', 'Awaiting response');

insert into public.outreach_contacts (contact_name, organization_name, category, contact_email, platform, audience_fit_notes, pitch_angle, status, approval_status, draft_copy)
values
  ('Sarah Lake', 'The Healing Current Podcast', 'podcast', 'hello@healingcurrent.fm', 'podcast', 'Good overlap with healing and purpose themes.', 'Healing through fishing and faith-inflected life lessons.', 'awaiting_approval', 'pending', 'Draft pitch prepared for Des review.'),
  ('Ben Foster', 'Coastal Angler Journal', 'fishing', 'editor@coastalangler.test', 'newsletter', 'Fishing audience with Father''s Day gift overlap.', 'Meaningful Father''s Day read with fishing roots.', 'researching', 'not_needed', null);

insert into public.content_items (title, content_type, platform, theme, status, draft_copy, asset_needed, cta, scheduled_for, notes)
values
  ('Launch email #1', 'email', 'email', 'launch', 'drafting', 'Hi friends,\n\nI''m so excited to share that Giant Fish & Happiness is finally live.\n\nThis book has been a long time coming, and the support has honestly been touching and overwhelming. So many of you have encouraged me, asked about the book, cheered it on, and helped me get to this point. I appreciate it more than I can say.\n\nYou can get the book here:\n\n[AMAZON BOOK LINK]\n\nAs a special launch thank-you, I''m also offering a $20 Celtic Quest Fishing coupon to anyone who buys the book.\n\nThe book is $19.99, so the coupon basically covers the cost of the book, and you can use it toward any Celtic Quest trip you''d like.\n\nHere''s how it works:\n\n1. Buy Giant Fish & Happiness on Amazon.\n2. Submit your Amazon order number here: [COUPON CLAIM LINK]\n3. After we verify the purchase, we''ll email you a $20 Celtic Quest coupon within 24 hours.\n\nThank you again for being part of this with me. I''m grateful, excited, and a little overwhelmed in the best possible way.\n\nGod bless,\n\nCaptain Des O''Sullivan\nCeltic Quest Fishing Fleet', false, 'Buy the book and submit an Amazon order number to claim the $20 coupon.', timestamptz '2026-05-04 13:00:00+00', null),
  ('Father''s Day email', 'email', 'email', 'fathers_day', 'idea', null, true, 'Order for Father''s Day.', timestamptz '2026-06-10 15:00:00+00', 'Need hero photo and gift angle');

insert into public.activity_log (event_type, entity_type, summary, details, created_by)
values
  ('system', 'app_settings', 'Seed data loaded', 'Starter tasks and sample records loaded for V1.', 'seed'),
  ('note', 'launch_tasks', 'Launch plan initialized', 'Initial starter tasks inserted from the approved spec.', 'seed');
