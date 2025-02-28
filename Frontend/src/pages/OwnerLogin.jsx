import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const OwnerLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Hook to navigate to another page

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
    // Add API call for authentication here
  };

  return (
    <>
      <Navbar />
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
            
            {/* Buttons Box */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }}>
              <Button type="submit" variant="contained" color="secondary" fullWidth>
                Login
              </Button>
              <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate("/owner/signup")}>
                Sign Up
              </Button>
            </Box>
          </form>
        </Paper>
        <ToastContainer position="top-center" autoClose={3000} />
      </Container>
    </>
  );
};

export default OwnerLogin;
