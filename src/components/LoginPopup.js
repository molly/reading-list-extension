import { Button } from "@mui/material";

export default function Login() {
  return (
    <>
      <Button
        variant="contained"
        onClick={chrome.tabs.create({ url: "login.html" })}
      >
        Log in
      </Button>
    </>
  );
}
