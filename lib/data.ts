import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseAdminClient, hasSupabaseEnv } from "@/lib/supabase";
import {
  mockActivity,
  mockContent,
  mockCouponClaims,
  mockLaunchTeam,
  mockOutreach,
  mockPurchases,
  mockReviews,
  mockRsvps,
  mockSettings,
  mockTasks,
} from "@/lib/mock-data";
import type {
  ActivityLog,
  AppSettings,
  ContentItem,
  CouponClaim,
  LaunchPartyRsvp,
  LaunchTask,
  LaunchTeamMember,
  OutreachContact,
  PurchaseSubmission,
  Review,
} from "@/lib/types";

function getClient() {
  noStore();
  return hasSupabaseEnv() ? getSupabaseAdminClient() : null;
}

async function fetchList<T>(
  table: string,
  fallback: T[],
  orderColumn = "created_at",
  ascending = false,
  select = "*"
): Promise<T[]> {
  const client = getClient();
  if (!client) return fallback;

  const { data, error } = await client
    .from(table)
    .select(select)
    .order(orderColumn, { ascending });

  if (error) {
    console.error(`Failed to load ${table}:`, error);
    return fallback;
  }

  return (data ?? fallback) as T[];
}

export async function getSettings(): Promise<AppSettings> {
  const client = getClient();
  if (!client) return mockSettings;

  const { data, error } = await client
    .from("app_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error("Failed to load app_settings:", error);
    return mockSettings;
  }

  return (data as AppSettings | null) ?? mockSettings;
}

export async function getTasks(): Promise<LaunchTask[]> {
  return fetchList<LaunchTask>("launch_tasks", mockTasks, "due_date", true);
}

export async function getLaunchTeam(): Promise<LaunchTeamMember[]> {
  return fetchList<LaunchTeamMember>("launch_team_members", mockLaunchTeam, "full_name", true);
}

export async function getOutreach(): Promise<OutreachContact[]> {
  return fetchList<OutreachContact>("outreach_contacts", mockOutreach, "updated_at", false);
}

export async function getContent(): Promise<ContentItem[]> {
  return fetchList<ContentItem>("content_items", mockContent, "scheduled_for", true);
}

export async function getPurchases(): Promise<PurchaseSubmission[]> {
  return fetchList<PurchaseSubmission>("purchase_submissions", mockPurchases, "submitted_at", false);
}

export async function getReviews(): Promise<Review[]> {
  return fetchList<Review>(
    "reviews",
    mockReviews,
    "updated_at",
    false,
    "*, launch_team_members(full_name, email)"
  );
}

export async function getActivity(): Promise<ActivityLog[]> {
  return fetchList<ActivityLog>("activity_log", mockActivity, "created_at", false);
}

export async function getCouponClaims(): Promise<CouponClaim[]> {
  return fetchList<CouponClaim>("coupon_claims", mockCouponClaims, "created_at", false);
}

export async function getRsvps(): Promise<LaunchPartyRsvp[]> {
  return fetchList<LaunchPartyRsvp>("launch_party_rsvps", mockRsvps, "created_at", false);
}

export async function getDashboardData() {
  const [settings, tasks, launchTeam, outreach, content, purchases, reviews, activity, couponClaims, rsvps] =
    await Promise.all([
      getSettings(),
      getTasks(),
      getLaunchTeam(),
      getOutreach(),
      getContent(),
      getPurchases(),
      getReviews(),
      getActivity(),
      getCouponClaims(),
      getRsvps(),
    ]);

  return { settings, tasks, launchTeam, outreach, content, purchases, reviews, activity, couponClaims, rsvps };
}
