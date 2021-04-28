import { useEffect } from "react";
import { useRouter } from "next/router";
import { useErrorDispatch } from "../chakra/contexts/error-context";
import { useToastDispatch } from "../chakra/contexts/toast-context";

export default function MessageRouter({ asPath, children }) {
  const router = useRouter();
  // success and error toast notifications from url paths thrown via _app.js
  const { setError } = useErrorDispatch();
  const { setMsg } = useToastDispatch();
  let error, success;

  if (process.browser) {
    error =
      asPath.includes("?error") &&
      decodeURIComponent(asPath.split("?error=")[1]);
    success =
      asPath.includes("?success") &&
      decodeURIComponent(asPath.split("?success=")[1]);
  }

  useEffect(() => {
    if (!error) return;
    setError(error);
    router.replace(router.asPath.split("?error=")[0]);
  }, [error]);

  useEffect(() => {
    if (!success) return;
    setMsg({ title: "success", status: "success", description: success });
    router.replace(router.asPath.split("?success=")[0]);
  }, [success]);

  return <>{children}</>;
}
