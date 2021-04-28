import NextLink from "next/link";
import { Button, Link } from "@chakra-ui/react";

export const ChNextButtonLink = ({
  label,
  href,
  chProps,
  children,
  ...rest
}) => {
  return (
    <NextLink {...{ href }} passHref {...rest}>
      <Button as={Link} {...chProps}>
        {label || children}
      </Button>
    </NextLink>
  );
};

export const ChNextLink = ({ label, href, chProps, children, ...rest }) => {
  return (
    <NextLink {...{ href }} passHref {...rest}>
      <Link {...chProps}>{label || children}</Link>
    </NextLink>
  );
};
