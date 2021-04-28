import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Authenticator from "@/components/auth/authenticator";

const VIEWS = {
  signin: "sign_in",
  signout: "sign_in",
  signup: "sign_up",
  "forgotten-password": "forgotten_password",
  "update-password": "update_password",
};

export default function AuthPage() {
  const router = useRouter();
  const { query } = router;

  const [view, setView] = useState(null);

  useEffect(() => {
    // @SCOPE:  update auth view based on query

    if (!query) return;
    const auth = query?.auth;
    if (auth) setView(auth[1]);
  }, [query?.auth]);

  return <Authenticator queryView={VIEWS[view]} />;
}
