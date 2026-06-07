-- Launch party RSVP list (Friday trip headcount).
-- Separate from launch_team_members so friends invited directly can be counted
-- alongside launch team members, and so reviewing no longer auto-confirms attendance.
create table if not exists public.launch_party_rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now()),

  full_name text not null,
  email text,
  party_size integer not null default 1,

  -- 'self' = submitted through the public RSVP page, 'manual' = added by Des
  source text not null default 'self',
  notes text
);

create index if not exists idx_launch_party_rsvps_email on public.launch_party_rsvps (lower(email));
create index if not exists idx_launch_party_rsvps_created on public.launch_party_rsvps (created_at);

create trigger launch_party_rsvps_updated_at
  before update on public.launch_party_rsvps
  for each row execute function public.set_updated_at();

alter table public.launch_party_rsvps enable row level security;
