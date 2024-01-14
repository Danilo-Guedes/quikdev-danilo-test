import { redirect } from "react-router";
import { ROUTES } from "../routes";

export function checkAuth() {
  const userToken = localStorage.getItem("user-token");

  if (!userToken) {
    console.log("viu que não tem userToken");
    return redirect(ROUTES.home);
  }
  console.log("passou do if");

  return true
}