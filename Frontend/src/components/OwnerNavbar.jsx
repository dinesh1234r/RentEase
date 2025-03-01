import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OwnerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dummy Logout Action
    localStorage.clear();
    navigate("/owner");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976D2" }}>
      <Toolbar>
        {/* App Name (Left Side) */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          RentEase
        </Typography>

        {/* Navigation Buttons (Right Side) */}
        <Box>
          <Button color="inherit" onClick={() => navigate("/owner/dashboard")}>
            Properties
          </Button>
          <Button color="inherit" onClick={() => navigate("/owner/add-property")}>
            Add Property
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default OwnerNavbar;
