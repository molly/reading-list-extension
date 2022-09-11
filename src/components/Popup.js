import { isLoggedIn } from "axios-jwt";
import LoginPopup from "./LoginPopup";
import NewEntry from "./NewEntry";

export default function Popup() {
  if (!isLoggedIn()) {
    return <LoginPopup />;
  }
  return <NewEntry />;
}
