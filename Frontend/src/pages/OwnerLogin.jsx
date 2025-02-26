import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

const OwnerLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast.error("Please enter both email and password!");
      return;
    }

    toast.success("Owner login successful!");
    // You can add API call here for authentication
  };

  return (
    <>
    <Navbar/>
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="secondary">
          Owner Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ marginTop: 2 }}>
            Login
          </Button>
        </form>
      </Paper>
      <ToastContainer position="top-center" autoClose={3000} />
    </Container>
    </>
  );
};

export default OwnerLogin;
