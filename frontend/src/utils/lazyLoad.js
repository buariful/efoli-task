import { lazy } from "react";

export const LoginPage = lazy(() => {
  const __import = import("../pages/Auth/LoginPage");
  __import.finally(() => {});
  return __import;
});
