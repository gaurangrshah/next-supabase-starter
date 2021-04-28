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

export function ForgottenPassword({ VIEWS, setAuthView, methods }) {
  const [email, setEmail] = useState("");
  const { setError } = useErrorDispatch();
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const response = await methods.requestReset(email);
    // @DONE: handle errors + success inside handle response

    if (response?.error)
      return Router.replace(
        `auth/signin?error=${response?.error?.message || response?.errors}`
      );
    else
      Router.replace(
        `dashboard/?success=Check your email for your password recovery link. ${
          email.split("@")[1]
        }`
      );
  };

  return (
    <Box as='form' my={8} onSubmit={handlePasswordReset}>
      <FormControl isDisabled={loading}>
        <InputGroup size='lg'>
          <InputLeftElement children={<EmailIcon size={21} />} />
          <Input
            id='email'
            name='email'
            placeholder='Your email address'
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              type='submit'
              icon={<AddIcon size={21} />}
              isLoading={loading}
              isDisabled={loading}
              s
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Text mt={4} textAlign='right'>
        Go to{" "}
        <ChLink onClick={() => setAuthView(VIEWS.SIGN_IN)}>sign in</ChLink>
      </Text>
    </Box>
  );
}
