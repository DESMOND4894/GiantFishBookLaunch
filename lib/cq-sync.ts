import { createClient } from "@supabase/supabase-js";

type SyncCouponInput = {
  coupon_code: string;
  email: string;
  first_name: string;
  last_name: string;
  coupon_value_cents: number;
};

type SyncCouponResult = {
  ok: boolean;
  cqCouponId?: string;
  error?: string;
};

export async function syncCouponToCq(input: SyncCouponInput): Promise<SyncCouponResult> {
  const url = process.env.CQ_SUPABASE_URL;
  const key = process.env.CQ_SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.CQ_COUPONS_TABLE || "vouchers";

  if (!url || !key) {
    return { ok: false, error: "CQ Supabase credentials are not configured." };
  }

  const client = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const code = input.coupon_code.toUpperCase();
  const discountValue = input.coupon_value_cents / 100;
  const recipientName = `${input.first_name} ${input.last_name}`.trim();

  const { data, error } = await client
    .from(table)
    .insert({
      code,
      discount_type: "fixed",
      discount_value: discountValue,
      max_uses: 1,
      max_uses_per_customer: 1,
      is_active: true,
      applies_to_all_products: true,
      is_per_person_discount: false,
      source: "promo",
      recipient_name: recipientName || null,
      recipient_email: input.email,
      notes: "Giant Fish & Happiness book launch coupon",
    })
    .select("id")
    .single();

  if (error) {
    console.error("CQ coupon sync failed:", error);
    return { ok: false, error: error.message };
  }

  return { ok: true, cqCouponId: data?.id ? String(data.id) : undefined };
}
