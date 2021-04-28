// @SCOPE:  used to render header content into app scaffold
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  chakra,
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VisuallyHidden,
  VStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, PhoneIcon } from "@chakra-ui/icons";

import { ChNextButtonLink } from "../next-link";

import { is } from "@/utils/validator";
import { Drawer } from "@/chakra/components/drawer";

const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  contact: "/contact",
  faqs: "/faqs",
};

export const FullLogo = ({
  src = "/logo-blue.png",
  imageProps = { width: "182px", height: "64px" },
  headingAs = "h1",
}) => {
  return (
    <Flex justify='space-between' align='center' px={{ base: 6, lg: 0 }}>
      <chakra.a
        href='/'
        title='falcon home page'
        display='flex'
        alignItems='center'
      >
        {/* <Image src={src} {...imageProps} /> */}
        <VisuallyHidden>
          <Heading as={headingAs} fontSize='4xl' fontWeight='bold'>
            GSDev
          </Heading>
          <chakra.p>Driving School</chakra.p>
        </VisuallyHidden>
      </chakra.a>
    </Flex>
  );
};

const NavLinks = ({ onClose, chProps, ...rest }) => {
  return (
    <Flex
      flexDirection={{ base: "column", md: "row" }}
      alignItems={{ base: "flex-end", md: "initial" }}
    >
      {!is.empty(routes) &&
        Object.keys(routes).map((key, i) => (
          <ChNextButtonLink
            key={key}
            href={routes[key]}
            chProps={{
              isActive: routes[i] === routes[key],
              onClick: onClose,
              _active: {
                textDecoration: "underline",
                color: "red",
              },

              ...chProps,
            }}
            {...rest}
          >
            {key}
          </ChNextButtonLink>
        ))}
    </Flex>
  );
};

export function CallLink({ ...rest }) {
  return (
    <>
      <ChNextButtonLink
        href='tel: +12018655225'
        chProps={{
          color: "blue.800",
          variant: "link",
          ...rest,
        }}
      >
        <VStack>{rest.children}</VStack>
      </ChNextButtonLink>
    </>
  );
}

export function HeaderContent() {
  const mobileNav = useDisclosure();

  return (
    <>
      <chakra.header w='full'>
        <Flex
          alignItems='center'
          justifyContent='space-between'
          mx='auto'
          px={{ base: 2, sm: 4 }}
          py={4}
        >
          <FullLogo />
          <HStack display='flex' alignItems='center' spacing={1}>
            <HStack
              justify='flex-end'
              spacing={1}
              mr={1}
              color='gray.700'
              display={{ base: "none", md: "inline-flex" }}
            >
              <NavLinks
                chProps={{
                  color: "blue.800",
                  variant: "link",
                  textTransform: "capitalize",
                  pr: 6,
                }}
              />
            </HStack>
            <CallLink />
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label='Open menu'
                fontSize='20px'
                color='blue.800'
                variant='ghost'
                icon={<HamburgerIcon />}
                onClick={mobileNav.onOpen}
              />
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
      <Drawer
        content={{
          header: {
            Component: FullLogo,
            props: {
              src: "/falcon-logo.svg",
              headingAs: "h2",
            },
          },
          body: {
            Component: NavLinks,
            props: {
              onClose: mobileNav.onClose,
              chProps: {
                my: { base: "4", lg: 0 },
                fontSize: "2xl",
                textTransform: "uppercase",
                py: 3,
                mr: { base: 12, lg: 0 },
                variant: "link",
              },
            },
          },
          footer: {
            Component: CallLink,
            props: {
              fontSize: "2xl",
              float: "right",
              color: "#FFF",
              bg: "#FAD201",
              w: "full",
              py: 12,
            },
          },
        }}
        {...mobileNav}
      />
    </>
  );
}
