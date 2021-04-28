import { sb } from "./initSupabase";
import appConfig from "../app.config";

import { extractUserNameFromEmail } from "@/utils/helpers";

const { details, routes } = appConfig;

const redirectTo = ({
  origin = "@redirectTo",
  status = "error",
  route,
  message,
}) => {
  return {
    props: {},
    redirect: {
      permanent: false,
      destination: `${route}/?${status}="${origin}--${message}"`,
    },
  };
};

export const getUserFromToken = async (req) => {
  // @DONE: user is available server-side as long as token has not expired
  // even when they've logged out client side
  // @DONE: remove cookie ? when user logs out on the client-side
  const token = req?.headers?.cookie?.split("sb:token=")[1] ?? null;

  if (!token) {
    return { error: { message: "token not found please signin" } };
  }

  const { data: user, error } = await sb.auth.api.getUser(token);
  if (!user || error) {
    return { error: { message: "error retrieving user session" } };
  }

  return { user };
};

export const dashboard = () => async ({ req, ...ctx }) => {
  const { user, error } = await getUserFromToken(req);
  if (!user || error) {
    return redirectTo({
      origin: "@profile",
      route: `/${routes?.signin}`,
      message: error?.message,
    });
  }
  return {
    props: {
      user: user ?? null,
      redirect: {
        permanent: true,
        destination: `${routes?.dashboard}`,
      },
    },
  };
};

export const profile = () => async ({ req, ...ctx }) => {
  const { user, error } = await getUserFromToken(req);
  if (error) {
    return redirectTo({
      origin: "@profile",
      route: `/${routes?.signin}`,
      message: error?.message,
    });
  }

  return {
    props: {
      user: user ?? null,
      redirect: {
        permanent: true,
        destination: `${routes?.profile}/me`,
      },
    },
  };
};

export const onboarding = () => async ({ req, ...ctx }) => {
  console.log("testing onboarding");
  const { user, error } = await getUserFromToken(req);
  if (error) {
    return redirectTo({
      origin: "@profile",
      route: `/${routes?.signin}`,
      status: "error",
      message: error?.message,
    });
  }

  return {
    props: {
      user: user ?? null,
      // redirect: {
      //   permanent: true,
      //   destination: `${routes?.profile}/me`,
      // },
    },
  };
};
