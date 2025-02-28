import React, { useState } from "react"; // ✅ Make sure this is correctly imported
import { Container, TextField, Button, Typography, Paper,Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const TenantLogin = () => {

  const navigate=useNavigate();

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

    toast.success("Tenant login successful!");
    // You can add API call here for authentication
  };

  return (
    <>
    <Navbar/>
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Tenant Login
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Login
          </Button>
              <Button variant="outlined" color="primary" fullWidth onClick={() => navigate("/tenent/signup")}>
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

export default TenantLogin;
