import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
      <Toolbar>
        {/* App Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          RentEase
        </Typography>

        {/* Navigation Links */}
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/tenant">Tenant Login</Button>
        <Button color="inherit" component={Link} to="/owner">Owner Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
