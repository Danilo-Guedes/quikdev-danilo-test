import { redirect } from "react-router";
import { ROUTES } from "../routes";

import { jwtDecode } from "jwt-decode";

export function checkAuth() {
  const userToken = localStorage.getItem("user-token");

  if (!userToken) {
    // console.log("viu que não tem userToken");
    return redirect(ROUTES.home);
  }

  const decodedToken = jwtDecode(userToken);


  const { exp } = decodedToken;

  if (Date.now() >= exp * 1000) {
    console.log("Token expired");
    localStorage.removeItem("user-token");
    localStorage.removeItem("user-data");
    return redirect(ROUTES.home);
  }

  return true;
}
