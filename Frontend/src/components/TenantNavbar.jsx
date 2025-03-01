import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TenantNavbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ bgcolor: "teal" }}>
      <Toolbar>
        {/* Logo / App Name */}
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
          RentEase - Tenant
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" onClick={() => navigate("/search")}>
            Search Properties
          </Button>
          <Button color="inherit" onClick={() => navigate("/bookings")}>
            Saved Properties
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            Profile
          </Button>
        </Box>

        {/* Logout Button */}
        <Button color="inherit" sx={{ ml: 2 }} onClick={() => {localStorage.clear();navigate("/tenent")}}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TenantNavbar;
