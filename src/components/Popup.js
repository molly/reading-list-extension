import { useEffect, useState } from "react";

import LoginPopup from "./LoginPopup";
import NewEntry from "./NewEntry";

export default function Popup() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log(user);
  }, [user]);

  if (!user) {
    return <LoginPopup setUser={setUser} />;
  }
  return <NewEntry />;
}
