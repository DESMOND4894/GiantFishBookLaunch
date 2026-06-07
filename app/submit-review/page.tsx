"use client";

import { useActionState } from "react";
import Image from "next/image";
import { submitReviewLink } from "@/app/actions";

const initialState = { ok: false, message: "" };

function ReviewProofForm({
  pending,
  message,
}: {
  pending: boolean;
  message: string;
}) {
  return (
    <>
      <div className="poster-form-heading">
        <span>Confirm Your Spot</span>
        <p>Post your review, then upload a screenshot below and you&apos;re all set.</p>
      </div>
      <div className="poster-field">
        <label htmlFor="review-email">Email</label>
        <input
          id="review-email"
          name="email"
          type="email"
          required
          placeholder="Enter the email you used to join the launch team"
        />
      </div>
      <div className="poster-field poster-upload">
        <label htmlFor="review-proof">Upload review screenshot</label>
        <input
          id="review-proof"
          name="review_proof"
          type="file"
          accept="image/*"
          required
        />
        <p>PNG, JPG, WEBP, or HEIC. Max 10MB.</p>
      </div>
      <button className="poster-submit" type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Confirm My Spot"}
      </button>
      {message ? <p className="poster-error">{message}</p> : null}
    </>
  );
}

export default function SubmitReviewPage() {
  const [state, action, pending] = useActionState(submitReviewLink, initialState);

  return (
    <main className="poster-page">
      <section className="poster-shell poster-shell-cropped" aria-label="Launch party invitation">
        <Image
          src="/launch-party-poster.png"
          alt="Giant Fish and Happiness launch party invitation"
          width={1024}
          height={1536}
          className="poster-artwork"
          priority
        />
      </section>

      {state.ok ? (
        <section className="poster-success-card">
          <div className="poster-success-mark">✓</div>
          <h1>You&apos;re on the list!</h1>
          <p>{state.message}</p>
        </section>
      ) : null}

      <section className="poster-happening-full">
        <h2>Here&apos;s what&apos;s happening!</h2>
        <div className="poster-happening-grid">
          <p>Hit the water and do some fishing with the Celtic Quest crew.</p>
          <p>I&apos;ll sign books for everyone who comes aboard.</p>
          <p>We&apos;ll share stories, talk about the good old days, and make new memories.</p>
          <p>Cold drinks, good laughs, and a celebration you won&apos;t want to miss.</p>
        </div>
      </section>

      {!state.ok ? (
        <form action={action} className="poster-real-form">
          <ReviewProofForm pending={pending} message={state.message} />
        </form>
      ) : null}

      <footer className="poster-signoff">
        Thank you again. Can&apos;t wait to see you soon! - Des
      </footer>
    </main>
  );
}
