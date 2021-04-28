import { useState } from "react";
import Router from "next/router";
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";

export function UpdatePassword({ methods }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const response = await methods.updatePassword(password);
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
    <Box as='form' my={8} onSubmit={handlePasswordReset}>
      <FormControl isDisabled={loading}>
        <FormLabel htmlFor='password'>Select a new password</FormLabel>
        <InputGroup size='lg'>
          <InputRightElement>
            <IconButton
              size='lg'
              type='submit'
              icon={<LockIcon size={21} />}
              isLoading={loading}
              isDisabled={loading}
              variant='ghost'
            />
          </InputRightElement>
          <Input
            id='password'
            name='password'
            label='New password'
            placeholder='Enter your new password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
      </FormControl>
      {message && <Text>{message}</Text>}
    </Box>
  );
}
