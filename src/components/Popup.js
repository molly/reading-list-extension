import { useState } from "react";

import LoginPopup from "./LoginPopup";
import Form from "./Form";

export default function Popup() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginPopup />;
  }
  return <Form />;
}
