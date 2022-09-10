import PropTypes from "prop-types";
import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { signin } from "../api/auth";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signin(username, password);
    setUser(user);
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
          autoComplete="username"
          margin="normal"
          required
          fullWidth
        ></TextField>
        <TextField
          label="Password"
          value={password}
          type="password"
          onChange={({ target: { value } }) => setPassword(value)}
          autoComplete="current-password"
          margin="normal"
          required
          fullWidth
        ></TextField>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          fullWidth
        >
          Log in
        </Button>
      </Box>
    </Box>
  );
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};
