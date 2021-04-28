import { createClient } from "@supabase/supabase-js";

const options = { persistSession: true, autoRefreshToken: true };

export const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  options
);

// @link https://github.com/vercel/nextjs-subscription-payments/blob/main/utils/supabase-admin.js
export const getUser = async (token) => {
  const { data, error } = await supabaseAdmin.auth.api.getUser(token);

  if (error) {
    throw error;
  }

  return data;
};
