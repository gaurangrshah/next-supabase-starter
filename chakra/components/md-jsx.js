import { chakra, Badge, Text, Heading } from "@chakra-ui/react";
import Markdown from "markdown-to-jsx";

import { ChNextButtonLink } from "../../components/next-link";
import { ChNextLink } from "@/components/next-link";

const CHMarkdown = chakra(Markdown);

const MarkdownJSX = ({ section = "", type, overrides, ...rest }) => {
  return (
    <CHMarkdown
      className='md-jsx'
      {...rest}
      options={{
        overrides: {
          a: (props) => (
            <ChNextLink {...props} {...layerStyles[type]?.a} {...rest.a} />
          ),
          h1: (props) => (
            <Heading {...props} {...layerStyles[type]?.h1} {...rest.h1} />
          ),
          h2: (props) => (
            <Heading {...props} {...layerStyles[type]?.h2} {...rest.h2} />
          ),
          h3: (props) => (
            <Heading {...props} {...layerStyles[type]?.h3} {...rest.h3} />
          ),
          p: (props) => (
            <Text {...props} {...layerStyles[type]?.p} {...rest.p} />
          ),
          ul: (props) => (
            <chakra.ul {...props} {...layerStyles[type]?.ul} {...rest.ul} />
          ),
          li: (props) => (
            <chakra.li {...props} {...layerStyles[type]?.li} {...rest.li} />
          ),
          ...overrides,
        },
      }}
    >
      {section}
    </CHMarkdown>
  );
};

export default MarkdownJSX;

const layerStyles = {
  hero: {
    a: {
      size: "xs",
      variant: "ghost",
      fontWeight: 700,
      textDecoration: "underline",
    },
    h1: {
      mb: 6,
      as: "h2",
      fontFamily: "body",
      fontSize: { base: "3xl", md: "3xl", lg: "4xl" },
      fontWeight: "bold",
      color: "#213D85",
      lineHeight: "shorter",
    },
    h2: {
      as: "p",
      pr: { base: 0, lg: 9 },
      mb: 4,
      fontSize: "md",
      color: "gray.700",
      letterSpacing: "wider",
    },
    h3: {},
    p: {
      pr: { base: 0, lg: 9 },
      mb: 4,
      fontSize: "md",
      color: "gray.700",
      letterSpacing: "wider",
    },
  },
  services: {
    h1: {
      as: "h2",
      fontFamily: "body",
      color: "#213D85",
      fontSize: "4xl",
      mb: 6,
    },
    h2: {},
    h3: {
      fontFamily: "body",
      color: "gray.600",
      fontSize: "xl",
    },
  },
  card: {
    h1: {},
    h2: {},
    h3: {
      as: "h3",
      pt: 12,
      fontFamily: "body",
      fontSize: "2xl",
      textTransform: "capitalize",
    },
    p: {
      pt: 3,
      px: 3,
      lineHeight: 1.3,
    },
  },
  info: {
    h1: {
      as: "h2",
      lineHeight: 2,
      fontFamily: "body",
      color: "#213D85",
    },
    h2: {},
    h3: {
      as: "h3",
      pt: 12,
      fontFamily: "body",
      fontSize: "md",
      textTransform: "capitalize",
      color: "gray.500",
      lineHeight: 1.8,
    },
    p: {
      pt: 3,
      lineHeight: 1.3,
      my: 6,
    },
    ul: {
      ml: 10,
      color: "gray.500",
    },
  },
  cta: {
    h1: {
      as: "h2",
      color: "#213D85",
      fontFamily: "body",
      fontSize: "4xl",
    },
    h2: {},
    h3: {
      as: "h3",
      fontFamily: "body",
      fontSize: "md",
      color: "gray.600",
    },
    p: {
      as: "p",
      fontFamily: "body",
      fontSize: "md",
      color: "gray.600",
    },
    ul: {
      display: "flex",
      flexDirection: "row",
      w: "70%",
      my: 4,
      listStyleType: "none",
      sx: {
        "& li:not(:last-child):after": {
          content: '" | "',
          mx: 4,
        },
      },
    },
    li: {
      color: "gray.500",
    },
  },
  ctaAlt: {
    h1: {
      as: "h2",
      color: "gray.700",
      fontFamily: "body",
      fontSize: "2xl",
    },
    h2: {
      fontSize: "md",
      fontFamily: "body",
    },
    h3: {
      as: "p",
      fontFamily: "body",
      fontSize: "md",
      color: "#213D85",
    },
    p: {
      as: "p",
      fontFamily: "body",
      fontSize: "md",
      color: "gray.600",
    },
    ul: {
      display: "flex",
      flexDirection: "row",
      w: "50%",
      ml: 10,
    },
  },
};
