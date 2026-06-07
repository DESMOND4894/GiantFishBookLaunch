"use client";

import { useActionState } from "react";
import { uploadArcPdf } from "@/app/actions";

const initialState = { ok: false, message: "" };

export function ArcPdfUpload() {
  const [state, action, pending] = useActionState(uploadArcPdf, initialState);

  return (
    <form action={action} className="actions" style={{ alignItems: "center" }}>
      <input type="file" name="pdf" accept="application/pdf" required />
      <button className="button" type="submit" disabled={pending}>
        {pending ? "Uploading..." : "Upload PDF"}
      </button>
      {state.message ? (
        <span className="small" style={{ color: state.ok ? "var(--success)" : "var(--danger)" }}>
          {state.message}
        </span>
      ) : null}
    </form>
  );
}
