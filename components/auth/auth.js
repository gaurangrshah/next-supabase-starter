// @link: https://github.com/supabase/ui/blob/develop/src/components/Auth/Auth.tsx
// @link https://tinyurl.com/yyhq45d2
// @DONE: refactor error handling for all auth endpoints
import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@chakra-ui/react";

import {
  UserProvider,
  useSupabase,
  useUser,
} from "@/contexts/supabase-context";

import {
  EmailAuth,
  SocialAuth,
  MagicLink,
  ForgottenPassword,
  UpdatePassword,
} from "./services";

const VIEWS = {
  SIGN_IN: "sign_in",
  SIGN_UP: "sign_up",
  FORGOTTEN_PASSWORD: "forgotten_password",
  MAGIC_LINK: "magic_link",
  UPDATE_PASSWORD: "update_password",
};

export function Auth({ providers, view = "sign_in" }) {
  const [authView, setAuthView] = useState(view);
  const {
    signIn,
    signOut,
    signUp,
    requestReset,
    updatePassword,
  } = useSupabase();

  const { session, user } = useUser();

  const AuthWrapper = (props) => (
    <Container maxW='lg' minW='md' py={8}>
      {!session && authView !== "update_password" && (
        <SocialAuth methods={{ signIn }} providers={providers} />
      )}

      {authView === "update_password" && session
        ? props.children
        : authView === "update_password" && (
            <p>
              You must be signed in order to update your password. <br />
              Please <Link href='/signin'>sign in</Link> or{" "}
              <Link href='/auth/forgotten-password'>
                request password reset
              </Link>
            </p>
          )}
      {!session && authView !== "update_password" && props.children}
    </Container>
  );

  useEffect(() => {
    // handle view override
    setAuthView(view);
  }, [view]);

  switch (authView) {
    case VIEWS.SIGN_IN:
    case VIEWS.SIGN_UP:
      return (
        <AuthWrapper>
          <EmailAuth
            {...{ VIEWS, authView, setAuthView }}
            methods={{ signIn, signOut, signUp, requestReset }}
          />
        </AuthWrapper>
      );
      break;
    case VIEWS.FORGOTTEN_PASSWORD:
      return (
        <AuthWrapper>
          <ForgottenPassword
            {...{ VIEWS, setAuthView }}
            methods={{ requestReset }}
          />
        </AuthWrapper>
      );
      break;
    case VIEWS.UPDATE_PASSWORD:
      return (
        <AuthWrapper>
          <UpdatePassword methods={{ updatePassword }} />
        </AuthWrapper>
      );
      break;
    case VIEWS.MAGIC_LINK:
      return (
        <AuthWrapper>
          <MagicLink {...{ VIEWS, setAuthView }} methods={{ signIn }} />
        </AuthWrapper>
      );
      break;
    default:
      break;
  }
}

Auth.ForgottenPassword = ForgottenPassword;
Auth.UpdatePassword = UpdatePassword;
Auth.MagicLink = MagicLink;
Auth.UserProvider = UserProvider;
Auth.useUser = useUser;
Auth.useSupabase = useSupabase;

export default Auth;
