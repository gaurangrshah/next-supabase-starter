// @link: https://github.com/supabase/ui/blob/develop/src/components/Auth/Auth.tsx
import { useState } from "react";
import Router from "next/router";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link as ChLink,
  Text,
} from "@chakra-ui/react";
import { EmailIcon, AddIcon } from "@chakra-ui/icons";
import { useErrorDispatch } from "@/chakra/contexts/error-context";

export function MagicLink({ VIEWS, setAuthView, methods }) {
  const [email, setEmail] = useState("");
  const { setError } = useErrorDispatch();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMagicLinkSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    const response = await methods.signIn({ email });
    // @DONE: handle errors + success inside handle response

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
    <Box as='form' onSubmit={handleMagicLinkSignIn} my={4}>
      <Box py={3}>
        <FormControl isDisabled={loading}>
          <InputGroup size='lg'>
            <InputLeftElement children={<EmailIcon size={21} />} />
            <Input
              id='email'
              name='email'
              label='you@youremail.com'
              placeholder='Your email address'
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                size='lg'
                type='submit'
                icon={<AddIcon size={21} />}
                isLoading={loading}
                isDisabled={loading}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>
      <ChLink onClick={() => setAuthView(VIEWS.SIGN_IN)} float='right'>
        Sign in with password.
      </ChLink>
      {message && <Text>{message}</Text>}
    </Box>
  );
}
