// @link: https://tinyurl.com/y5wdl76g
import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Button, Flex, HStack, Spinner, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { sb } from "@/lib/initSupabase";

import { Auth } from "./auth";
import { useUser, useSupabase } from "@/contexts/supabase-context";

export default function Authenticator({ queryView = "sign_in" }) {
  const [authView, setAuthView] = useState(queryView);
  const { session, user } = useUser();
  const { signOut, updatePassword } = useSupabase();

  useEffect(() => {
    // @link: implements: "../../pages/[...auth]"
    // @SCOPE:  sets the authView to the params available from queryView
    setAuthView(queryView);
    // if there is a server error -> log user out
    // return () => setAuthView(queryView);
  }, [queryView]);

  useEffect(() => {
    // @SCOPE:  handle while views are shown for specific supabase auth events
    // for each request made to /api/auth add session onto {req.headers}
    const { data: authListener } = sb.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") setAuthView("update_password");
        if (event === "USER_UPDATED") {
          setTimeout(() => setAuthView("sign_in"), 1000);
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const View = () => {
    if (!session)
      return (
        <Box my={8}>
          <Auth
            providers={["google", "github"]}
            view={authView}
            //  add any props that should be exposed to each of the auth components
          />
        </Box>
      );

    return (
      <Flex direction='column' my={6}>
        <Text pt={6}>
          <Link href='/profile'>
            <a>SSR example with getServerSideProps</a>
          </Link>
        </Text>
        {authView === "update_password" && (
          <Auth.UpdatePassword methods={{ updatePassword }} />
        )}
        {session && (
          <
            // if there is a user, render user related info
          >
            <HStack justify='space-between'>
              <Box>
                <Text>You're signed in</Text>
                <Text fontWeight={600}>Email: {user?.email}</Text>
              </Box>
              <Box>
                <Button
                  leftIcon={<AddIcon type='LogOut' />}
                  variant='outline'
                  colorScheme='gray'
                  onClick={signOut}
                  borderColor='gray.500'
                >
                  Sign out
                </Button>
              </Box>
            </HStack>
            {session && !authView === "update_password" && (
              // show when authenticated and not updatepw view=
              <Box>
                <Text type='success'>
                  User data retrieved server-side (in API route):
                </Text>

                <pre>{JSON.stringify(user, null, 2)}</pre>
              </Box>
            )}
          </>
        )}
        {/* show when not authenticated, and an error occured getting data: getInitialProps() */}
        {!session && <Spinner />}
      </Flex>
    );
  };
  return (
    <Box maxW='lg' margin='8em auto' p={6} boxShadow='lg' borderRadius='5px'>
      <View />
    </Box>
  );
}
