"use client";

import { useActionState } from "react";
import { submitRsvp } from "@/app/actions";

const initialState = { ok: false, message: "" };

export function RsvpForm() {
  const [state, action, pending] = useActionState(submitRsvp, initialState);

  if (state.ok) {
    return (
      <div className="lt-success-card">
        <div className="lt-success-icon">&#10003;</div>
        <h2>You&apos;re on the list!</h2>
        <p>{state.message}</p>
        <p className="lt-success-note">
          Need to change your headcount? Just submit again with the same email and
          we&apos;ll update it.
        </p>
      </div>
    );
  }

  return (
    <div className="lt-form-card">
      <h2>RSVP for the Friday Trip</h2>
      <p className="lt-form-desc">
        Let me know you&apos;re coming so I can get a headcount for the boat.
      </p>
      <form action={action} className="lt-form">
        <div className="lt-field">
          <label htmlFor="rsvp-name">Full Name</label>
          <input id="rsvp-name" name="full_name" required placeholder="Your name" />
        </div>
        <div className="lt-field">
          <label htmlFor="rsvp-email">Email</label>
          <input id="rsvp-email" name="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="lt-field">
          <label htmlFor="rsvp-party">How many in your party? (including you)</label>
          <input
            id="rsvp-party"
            name="party_size"
            type="number"
            min={1}
            max={20}
            defaultValue={1}
            required
          />
        </div>
        <button className="lt-submit" type="submit" disabled={pending}>
          {pending ? "Sending..." : "Count Me In"}
        </button>
        {state.message && !state.ok ? <p className="lt-error">{state.message}</p> : null}
      </form>
    </div>
  );
}
