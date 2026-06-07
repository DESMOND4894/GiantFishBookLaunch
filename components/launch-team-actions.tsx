import type { LaunchTeamMember } from "@/lib/types";

export function LaunchTeamActions({ members }: { members: LaunchTeamMember[] }) {
  const arcReady = members.filter((member) => member.email && member.agreed_to_read_review && !member.arc_sent);
  const reviewPending = members.filter((member) => member.arc_sent && !member.review_posted);
  const launchPartyReady = members.filter((member) => member.review_posted || member.launch_party_confirmed);

  return (
    <section className="panel">
      <h3>Launch team snapshot</h3>
      <div className="card-grid compact-cards">
        <div className="metric-card">
          <p>Needs ARC</p>
          <strong>{arcReady.length}</strong>
          <span>Agreed readers with email, PDF not sent.</span>
        </div>
        <div className="metric-card">
          <p>Review pending</p>
          <strong>{reviewPending.length}</strong>
          <span>ARC sent, review not recorded.</span>
        </div>
        <div className="metric-card">
          <p>Launch party ready</p>
          <strong>{launchPartyReady.length}</strong>
          <span>Review or confirmation recorded.</span>
        </div>
      </div>
    </section>
  );
}
