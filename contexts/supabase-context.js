import { createContext, useContext, useEffect, useState } from "react";
import { Spinner } from "@/chakra/components/spinner";
import { authHandler } from "@/utils/response-handler";

export const UserContext = createContext();
export const SupabaseContext = createContext();

export const UserProvider = ({ sb, children }) => {
  const [user, setUser] = useState(null);
  const [userMeta, setUserMeta] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const deAuthenticate = async () => {
    console.log("deauthenticating");
    setLoading(true);
    setSession(null);
    setUserMeta(null);
    setUser(null);
    setLoading(false);
  };

  const authenticate = (event, session) => {
    console.log("authenticating");
    setLoading(true);
    const sessionUser = session?.user;
    setUser(sessionUser ?? null);
    setSession(session ?? null);
    setLoading(false);
  };

  const getUserMeta = async (userId) => {
    return await sb.from("users").select("*").eq("id", userId);
  };

  // 🚧 testing session
  useEffect(() => console.log("session logger", session), [session]);

  useEffect(() => {
    // @SCOPE:  set user onMount
    const user = sb.auth.user();
    if (user && !userMeta) {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    // @SCOPE:  set session onMount
    const sess = sb.auth.session();
    setSession(sess);
    setUser(sess?.user ?? null);
    if (!sess?.user) deAuthenticate();
  }, []);

  useEffect(() => {
    // @SCOPE: update user meta everytime user changes
    if (!user) return;
    Promise.allSettled([getUserMeta(user.id)]).then((res) => {
      setUserMeta(res[0]?.value?.data[0] ?? null);
    });
  }, [user]);

  useEffect(() => {
    // @SCOPE: authenticate and deauthenticate user based on event
    const { data: authListener } = sb.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          authenticate(event, session);
        }
        if (event === "SIGNED_OUT") {
          deAuthenticate(event, session);
        }
        console.log("🚀 ~ AUTHEVENT ~ useEffect ~ event", event);
        // @SCOPE: used to authenticated and deauthenticate users accordingly
        // @NOTE: only required when using SSR
        fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json(res));
      }
    );
    // handle unmount
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, session }}>
      {loading && <Spinner />}
      {children}
    </UserContext.Provider>
  );
};

export const SupabaseProvider = ({ sb, children, ...props }) => {
  const authenticator = {
    signIn: (options) => authHandler(() => sb.auth.signIn(options)),
    signUp: (options) => authHandler(() => sb.auth.signUp(options)),
    requestReset: (options) => {
      return authHandler(() => sb.auth.api.resetPasswordForEmail(options));
    },
    updatePassword: (options) => authHandler(() => sb.auth.update(options)),
    signOut: () => authHandler(() => sb.auth.signOut()),
  };

  return (
    <SupabaseContext.Provider value={{ ...authenticator, sb }} {...props}>
      <UserProvider {...{ sb }}>{children}</UserProvider>
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);

  if (context === undefined) {
    throw new Error(
      "useSupabase must be used within a SupabaseContext.Provider"
    );
  }

  return context;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserContext.Provider");
  }

  return context;
};
