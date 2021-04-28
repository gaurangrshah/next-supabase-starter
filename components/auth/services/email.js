import { useState } from "react";
import Router from "next/router";
import {
  Box,
  Checkbox,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Link as ChLink,
  VisuallyHidden,
} from "@chakra-ui/react";

import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { useColor } from "@/chakra/hooks/use-color";
import { extractUserNameFromEmail } from "@/utils/helpers";

export function EmailAuth({ VIEWS, methods, authView, setAuthView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const { color } = useColor();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    switch (authView) {
      case "sign_in":
        // @DONE: handle errors + success inside handle response
        const response = await methods.signIn({ email, password });
        if (response?.error) {
          Router.replace(`signin/?error=${response?.error?.message}`);
        } else {
          Router.replace(
            `profile/${extractUserNameFromEmail(
              response?.user?.email
            )}/?success=${"Welcome"}`
          );
        }

        setLoading(false);
        break;
      case "sign_up":
        await methods.signUp({ email, password });
        // @DONE: handle errors + success inside handle response
        const response2 = await methods.signUp({ email, password });
        if (response2?.error) {
          Router.replace(`signin/?error=${response2?.error?.message}`);
        } else {
          Router.replace(`signin/?success=${"Welcome"}`);
        }

        setLoading(false);
        break;
    }
  };

  return (
    <Box as='form' my={6} onSubmit={handleSubmit}>
      <HStack
        justify='space-between'
        mb={8}
        py={1}
        px={3}
        borderRadius={"md"}
        opacity={0.55}
        bg={color("bgAlt")}
      >
        {authView === VIEWS.SIGN_IN && (
          <ChLink onClick={() => setAuthView(VIEWS.MAGIC_LINK)}>
            Sign in with magic link
          </ChLink>
        )}
        {authView === VIEWS.SIGN_IN ? (
          <ChLink onClick={() => setAuthView(VIEWS.SIGN_UP)}>
            Don't have an account? Sign up
          </ChLink>
        ) : (
          <ChLink onClick={() => setAuthView(VIEWS.SIGN_IN)}>
            Do you have an account? Sign in.
          </ChLink>
        )}
      </HStack>

      <Box py={3}>
        <FormControl isDisabled={loading}>
          <VisuallyHidden>
            <FormLabel htmlFor='email'>Email</FormLabel>
          </VisuallyHidden>
          <InputGroup>
            <InputLeftElement children={<EmailIcon size={21} />} />
            <Input
              id='email'
              name='email'
              placeholder='you@youremail.com'
              autoComplete='email'
              onChange={(e) => setEmail(e.target.value)}
              mb={6}
            />
          </InputGroup>
          <VisuallyHidden>
            <FormLabel htmlFor='password'>password</FormLabel>
          </VisuallyHidden>
          <InputGroup>
            <InputLeftElement children={<LockIcon size={21} />} />
            <Input
              id='password'
              name='password'
              type='password'
              placeholder='********************'
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </FormControl>
      </Box>
      <Flex direction='column' justifyContent='space-between'>
        <HStack justify='space-between' mb={6}>
          <Checkbox
            name='remember_me'
            id='remember_me'
            onChange={(value) => setRememberMe(value.target.checked)}
          >
            <small>Remember me</small>
          </Checkbox>
          {authView === VIEWS.SIGN_IN && (
            <ChLink onClick={() => setAuthView(VIEWS.FORGOTTEN_PASSWORD)}>
              Forgot your password?
            </ChLink>
          )}
        </HStack>
        <Button
          type='submit'
          size='lg'
          leftIcon={<LockIcon size={21} />}
          isLoading={loading}
        >
          {authView === VIEWS.SIGN_IN ? "Sign in" : "Sign up"}
        </Button>
      </Flex>
    </Box>
  );
}
