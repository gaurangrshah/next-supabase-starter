import { useState } from "react";
import Router from "next/router";
import { Box, Divider, HStack, IconButton, Text } from "@chakra-ui/react";
import * as SocialIcons from "@/components/auth/social-icons";
import { useErrorDispatch } from "@/chakra/contexts/error-context";

export function SocialAuth({ methods, providers }) {
  const [loading, setLoading] = useState(false);

  // @DONE: handle errors + success inside handle response
  const handleProviderSignIn = async (provider) => {
    setLoading(true);
    const repsonse = await methods.signIn({ provider });

    if (response?.error)
      return Router.replace(
        `auth/signin?error=${response?.error?.message || response?.errors}`
      );
    else
      Router.replace(
        `dashboard/?success=Check your email for your login link. https://${
          email.split("@")[1]
        }`
      );

    setLoading(false);
  };

  return (
    providers &&
    providers.length > 0 && (
      <>
        <Box textAlign='center'>
          <Text as='h2'>Sign in with</Text>
          <HStack spacing={9} justify='center' mt={6}>
            {providers.map((provider) => {
              const AuthIcon = SocialIcons[provider];
              return (
                <Box key={provider}>
                  <IconButton
                    variant='outline'
                    icon={<AuthIcon />}
                    isLoading={loading}
                    isDisabled={loading}
                    size='lg'
                    onClick={() => handleProviderSignIn(provider)}
                    borderColor='gray.600'
                  />
                </Box>
              );
            })}
          </HStack>
        </Box>

        <HStack align='center' justify='space-evenly' mx='auto' my={12}>
          <Divider />
          <Text align='center' w='100%'>
            Or Continue With
          </Text>
          <Divider />
        </HStack>
      </>
    )
  );
}

// default styles for social buttons
const buttonStyles = {
  google: {
    backgroundColor: "#ce4430",
    color: "white",
  },
  facebook: {
    backgroundColor: "#4267B2",
    color: "white",
  },
  twitter: {
    backgroundColor: "#1DA1F2",
  },
  gitlab: {
    backgroundColor: "#FC6D27",
  },
  github: {
    backgroundColor: "#333",
    color: "white",
  },
  bitbucket: {
    backgroundColor: "#205081",
    color: "white",
  },
};
