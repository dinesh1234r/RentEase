import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Backdrop,
  Box,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import TenantNavbar from "../components/TenantNavbar"; // Importing Tenant Navbar

const TenantDashboard = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [position, setPosition] = useState(null);

  // Dummy property data
  const properties = [
    {
      id: 1,
      title: "Luxury Apartment",
      location: "Downtown, NYC",
      rent: 2500,
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      furnished: true,
      available: true,
      amenities: ["WiFi", "Gym", "Swimming Pool"],
      images: [
        "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?cs=srgb&dl=landscape-sky-clouds-259588.jpg&fm=jpg",
        "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?cs=srgb&dl=landscape-sky-clouds-259588.jpg&fm=jpg",
        "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?cs=srgb&dl=landscape-sky-clouds-259588.jpg&fm=jpg",
        "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?cs=srgb&dl=landscape-sky-clouds-259588.jpg&fm=jpg",
        "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?cs=srgb&dl=landscape-sky-clouds-259588.jpg&fm=jpg",
      ],
      ownerphoneno: "9876543210",
    },
    {
      id: 2,
      title: "Cozy Studio",
      location: "Brooklyn, NYC",
      rent: 1500,
      type: "Studio",
      bedrooms: 1,
      bathrooms: 1,
      furnished: false,
      available: false,
      amenities: ["WiFi"],
      images: ["https://via.placeholder.com/600x400"],
      ownerphoneno: "9876543211",
    },
  ];

  const openProperty = (property, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
    setSelectedProperty(property);
  };

  const closeProperty = () => {
    setSelectedProperty(null);
  };

  return (
    <>
      <TenantNavbar />
      <Container style={{ marginTop: "80px" }}> {/* Added margin-top for Navbar */}
        <Grid container spacing={3}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card
                sx={{
                  maxWidth: 400,
                  height: "auto",
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
                onClick={(event) => openProperty(property, event)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={property.images[0]}
                  alt={property.title}
                />
                <CardContent>
                  <Typography variant="h6">{property.title}</Typography>
                  <Typography color="textSecondary">{property.location}</Typography>
                  <Typography>Rent: ${property.rent}</Typography>
                  <Typography>Type: {property.type}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Full-Screen View */}
      <AnimatePresence>
        {selectedProperty && (
          <Backdrop
            open
            sx={{
              zIndex: 999,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(5px)",
            }}
          >
            <motion.div
              initial={{
                x: position.x,
                y: position.y,
                width: position.width,
                height: position.height,
                opacity: 0.8,
              }}
              animate={{
                x: "5vw",
                y: "10vh",
                width: "90vw",
                height: "80vh",
                opacity: 1,
                borderRadius: "10px",
              }}
              exit={{
                x: position.x,
                y: position.y,
                width: position.width,
                height: position.height,
                opacity: 0.8,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1000,
                backgroundColor: "white",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <IconButton
                onClick={closeProperty}
                sx={{ position: "absolute", top: 10, right: 10, zIndex: 1001 }}
              >
                <CloseIcon />
              </IconButton>

              {/* Horizontal Scroll for Images */}
              <Box
                sx={{
                  width: "100%",
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  display: "flex",
                  gap: "10px",
                  paddingBottom: "10px",
                  scrollBehavior: "smooth",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {selectedProperty.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Property"
                    style={{
                      height: "300px",
                      width: "auto",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                ))}
              </Box>

              {/* Two-Column Layout for Property Details */}
              <Grid container spacing={2}>
                {/* Left Column */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h4">{selectedProperty.title}</Typography>
                  <Typography variant="h6">{selectedProperty.location}</Typography>
                  <Typography>Rent: ${selectedProperty.rent}</Typography>
                  <Typography>Type: {selectedProperty.type}</Typography>
                  <Typography>Bedrooms: {selectedProperty.bedrooms}</Typography>
                  <Typography>Bathrooms: {selectedProperty.bathrooms}</Typography>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={6}>
                  <Typography>Furnished: {selectedProperty.furnished ? "Yes" : "No"}</Typography>
                  <Typography>Available: {selectedProperty.available ? "Yes" : "No"}</Typography>
                  <Typography variant="subtitle2">Amenities:</Typography>
                  <List dense>
                    {selectedProperty.amenities.map((amenity, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={`• ${amenity}`} />
                      </ListItem>
                    ))}
                  </List>
                  <Typography variant="subtitle2">
                    Owner Contact: {selectedProperty.ownerphoneno}
                  </Typography>
                </Grid>
              </Grid>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </>
  );
};

export default TenantDashboard;
