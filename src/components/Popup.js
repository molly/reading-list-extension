import { useEffect, useState } from "react";
import { isLoggedIn as axiosIsLoggedIn } from "axios-jwt";
import { isLoggedIn as dbIsLoggedIn } from "../api/auth";

import LoginPopup from "./LoginPopup";
import NewEntry from "./NewEntry";

export default function Popup() {
  const [isLoggedIn, setIsLoggedIn] = useState(axiosIsLoggedIn());

  useEffect(() => {
    async function fetchIsSignedIn() {
      const isSignedIn = await dbIsLoggedIn();
      setIsLoggedIn(isSignedIn);
    }
    fetchIsSignedIn();
  }, []);

  if (!isLoggedIn) {
    return <LoginPopup setIsLoggedIn={setIsLoggedIn} />;
  }
  return <NewEntry setIsLoggedIn={setIsLoggedIn} />;
}
