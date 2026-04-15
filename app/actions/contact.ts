"use server";

import { supabaseServer } from "@/lib/supabase-server";

export type ContactResult =
  | { success: true }
  | { success: false; error: string };

export async function submitContact(
  _prevState: ContactResult,
  formData: FormData,
): Promise<ContactResult> {
  const name = (formData.get("name") as string | null)?.trim() || null;
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();
  const message = (formData.get("message") as string | null)?.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (!message) {
    return { success: false, error: "Please enter a message." };
  }

  const { error } = await supabaseServer
    .from("contacts")
    .insert({ name, email, message });

  if (error) {
    console.error("Contact insert failed", {
      code: error.code,
      message: error.message,
    });

    if (process.env.NODE_ENV !== "production") {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
