import { sb } from "@/lib/initSupabase";

export const serverUser = async (req) => {
  return await sb.auth.api.getUserByCookie(req);
};
export function getTokenFromLocalStorage() {
  const token = JSON.parse(localStorage.getItem("supabase.auth.token"))
    .currentSession.access_token;

  if (token) return token;
}
