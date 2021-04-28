export const header = {
  parts: ["wrapper", "container"],
  default: {},
  dashboard: {},
};

header.default.wrapper = {
  as: "header",
  w: "full",
  h: "60px",
  p: 4,
};

header.default.container = {
  jusitfy: "space-between",
  align: "center",
  maxW: "container.lg",
  mx: "auto",
};

header.dashboard.wrapper = {
  as: "header",
  w: 20,
  h: "full",
  p: 2,
  bg: "gray.900",
};

header.dashboard.container = {
  direction: "column",
  align: "center",
  maxW: 20,
  mx: "auto",
  h: "full",
  p: 4,
  px: 6,
};

export const footer = {
  parts: ["wrapper", "container"],
  default: {},
  dashboard: {},
};

footer.default.wrapper = {
  as: "footer",
  w: "full",
  h: "60px",
  p: 4,
};

footer.default.container = {
  jusitfy: "space-between",
  align: "center",
  maxW: "container.lg",
  mx: "auto",
};

footer.dashboard.wrapper = {
  display: "none",
  visibility: "hidden",
};

footer.dashboard.container = {};
