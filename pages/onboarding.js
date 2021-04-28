import { onboarding } from "@/lib/get-serverside-props";
// import { ShowJson } from "@/chakra/components/show-json";
import { useUser } from "@/contexts/supabase-context";

import { useProtection } from "../components/auth/protected";
export default function Onboarding({ children = "onboarding" }) {
  const Protected = useProtection();
  const { user } = useUser();

  return <Protected {...{ user }}>{children}</Protected>;
}

export const getServerSideProps = onboarding();
