import { RsvpForm } from "@/components/rsvp-form";

export default function RsvpPage() {
  return (
    <div className="lt-landing rsvp-page">
      <section className="lt-hero">
        <div className="lt-hero-glow" />
        <div className="lt-hero-inner">
          <div className="lt-hero-text">
            <p className="lt-eyebrow">Launch Party Trip</p>
            <h1 className="lt-title">Come Fishing Friday Night</h1>
            <p className="lt-subtitle">
              A free trip on the Celtic Quest to celebrate the launch of
              Giant Fish &amp; Happiness
            </p>
            <p className="lt-hook">
              I&apos;m hosting a launch party trip out of Port Jefferson and I&apos;d
              love for you to be aboard. We&apos;ll fish, share stories, and have a
              great night on the water.
            </p>
            <p className="lt-hook">
              Just let me know you&apos;re coming so I can get a headcount.
            </p>
            <div className="rsvp-details">
              <p><span>When</span> Friday, June 12, 2026 · 4:30&ndash;8:30 p.m.</p>
              <p><span>Where</span> 118 West Broadway, Port Jefferson, New York</p>
              <p><span>Food &amp; Drink</span> Light snacks and hors d&apos;oeuvres will be served. BYOB.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="lt-form-section" id="rsvp">
        <RsvpForm />
      </section>

      <footer className="lt-footer">
        <p>
          Captain Desmond O&apos;Sullivan &middot; Celtic Quest Fishing Fleet &middot;
          Port Jefferson, Long Island, NY
        </p>
      </footer>
    </div>
  );
}
