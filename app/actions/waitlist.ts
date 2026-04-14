"use server";

import { supabaseServer } from "@/lib/supabase-server";

type WaitlistResult =
  | { success: true }
  | { success: false; error: string };

function getWaitlistErrorMessage(error: {
  code?: string;
  message?: string;
}) {
  if (error.code === "23505") {
    return "You're already on the waitlist!";
  }

  if (process.env.NODE_ENV !== "production") {
    if (error.code === "PGRST205") {
      return "Supabase table `waitlist` was not found. Create it in your Supabase project first.";
    }

    if (error.code === "42501") {
      return "Supabase blocked the insert. Add a waitlist INSERT policy or use SUPABASE_SERVICE_ROLE_KEY for this server action.";
    }

    return error.message || "Supabase rejected the waitlist insert.";
  }

  return "Something went wrong. Please try again.";
}

export async function joinWaitlist(_prevState: WaitlistResult, formData: FormData): Promise<WaitlistResult> {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();
  const name = (formData.get("name") as string | null)?.trim() || null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const { error } = await supabaseServer
    .from("waitlist")
    .insert({ email, name });

  if (error) {
    console.error("Waitlist insert failed", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    return { success: false, error: getWaitlistErrorMessage(error) };
  }

  return { success: true };
}
