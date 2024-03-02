import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { isLoggedIn as dbIsLoggedIn } from "../api/auth";
import LoginPopup from "./LoginPopup";
import NewEntry from "./NewEntry";

export default function Popup() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    async function fetchIsSignedIn() {
      const isSignedIn = await dbIsLoggedIn();
      setIsLoggedIn(isSignedIn);
    }
    fetchIsSignedIn();
  }, []);

  if (isLoggedIn === false) {
    return <LoginPopup setIsLoggedIn={setIsLoggedIn} />;
  } else if (isLoggedIn) {
    return <NewEntry setIsLoggedIn={setIsLoggedIn} />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "600px",
        width: "100%"
      }}
    >
      <CircularProgress />
    </Box>
  );
}
