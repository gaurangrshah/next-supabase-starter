/**
 * NOTE: this file is only needed if you're doing SSR (getServerSideProps)!
 * @link: https://tinyurl.com/y6bxgc3k
 */
import { sb } from "@/lib/initSupabase";

export default async function handler(req, res) {
  // @SCOPE:  set authToken cookie to request object on signin and remove on signout
  return sb.auth.api.setAuthCookie(req, res);
}
