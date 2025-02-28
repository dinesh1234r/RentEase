import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const OwnerSignup = () => {
  const [user, setUser] = useState({ name: "", email: "", phoneno: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user.name || !user.email || !user.phoneno || !user.password) {
      toast.error("Please fill all the fields!");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8080/owner/register", user);
      
      // Store user data properly in localStorage
      localStorage.setItem("userinfo", JSON.stringify(response.data));
  
      toast.success("Signup Successful! Redirecting...");
      setTimeout(() => navigate("/tenent/dashboard"), 2000);
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.response?.data?.message || "Signup failed! Please try again.");
    }
  };
  

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 5, textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" color="secondary">
            Owner Signup
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Phone Number"
              type="tel"
              name="phoneno"
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
                Sign Up
              </Button>
              <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate("/owner")}>
                Already have an account? Login
              </Button>
            </Box>
          </form>
        </Paper>
        <ToastContainer position="top-center" autoClose={3000} />
      </Container>
    </>
  );
};

export default OwnerSignup;
