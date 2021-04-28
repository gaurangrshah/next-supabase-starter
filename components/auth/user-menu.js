import { useEffect } from "react";
import Link from "next/link";
import {
  Avatar,
  Link as ChLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { useUser } from "@/contexts/supabase-context";

export function UserMenu() {
  const { user, session } = useUser();

  useEffect(() => session && console.log("user menu updated"), [session]);

  return (
    <Menu placement='bottom-end' closeOnSelect>
      <Avatar
        as={MenuButton}
        name={user?.email}
        src=''
        _hover={{ cursor: "pointer" }}
        ml='auto'
        size="md"
      />
      <MenuList>
        {!session ? (
          <>
            <MenuItem>
              <Link href='/auth/signin'>
                <ChLink w='full'>Sign in</ChLink>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href='/auth/signup'>
                <ChLink w='full'>Sign up</ChLink>
              </Link>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem>
              <Link href='/dashboard/pages'>
                <ChLink w='full'>Dashboard</ChLink>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href='/onboarding'>
                <ChLink w='full'>Onboarding</ChLink>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href='/profile'>
                <ChLink w='full'>Profile</ChLink>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href='/auth/update-password'>
                <ChLink w='full'>Update Password</ChLink>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href='/auth/signout'>
                <ChLink w='full'>Sign out</ChLink>
              </Link>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
}
