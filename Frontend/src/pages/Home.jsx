import React from "react";
import { Container, Typography, Button, Grid, Paper, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
    <Navbar/>
    <Container maxWidth="lg">
      
      {/* Hero Section */}
      <Paper elevation={3} sx={{ padding: 4, textAlign: "center", marginTop: 5 }}>
        <Typography variant="h3" fontWeight="bold" color="primary">
          Welcome to RentEase
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ marginTop: 2 }}>
          Find and rent your dream home or list your property effortlessly!
        </Typography>
        
        {/* Role Selection */}
        <Box sx={{ marginTop: 4 }}>
          <Button variant="contained" color="primary" component={Link} to="/tenant" sx={{ margin: 1 }}>
            Tenant Login
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/owner" sx={{ margin: 1 }}>
            Owner Login
          </Button>
        </Box>
      </Paper>

      {/* Features Section */}
      <Typography variant="h4" fontWeight="bold" sx={{ marginTop: 5, textAlign: "center" }}>
        Why Choose RentEase?
      </Typography>
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ padding: 3, textAlign: "center" }}>
            <Typography variant="h6" fontWeight="bold">🔍 Find Rentals Easily</Typography>
            <Typography color="textSecondary">Browse and search thousands of verified properties.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ padding: 3, textAlign: "center" }}>
            <Typography variant="h6" fontWeight="bold">💼 List Your Property</Typography>
            <Typography color="textSecondary">Post your property in just a few clicks.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ padding: 3, textAlign: "center" }}>
            <Typography variant="h6" fontWeight="bold">🔒 Secure & Reliable</Typography>
            <Typography color="textSecondary">Safe transactions and verified owners/tenants.</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={{ marginTop: 5, textAlign: "center", padding: 2, bgcolor: "#f5f5f5" }}>
        <Typography variant="body2" color="textSecondary">
          &copy; 2025 RentEase. All rights reserved.
        </Typography>
      </Box>
    </Container>
    </>
  );
};

export default Home;
