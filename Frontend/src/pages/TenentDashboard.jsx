import React, { useEffect, useState } from "react";
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
  Button,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import TenantNavbar from "../components/TenantNavbar";
import axios from "axios";

const TenantDashboard = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [position, setPosition] = useState(null);
  const [savedProperties, setSavedProperties] = useState(new Set());

  const [properties,setProperties] =useState([]);

  useEffect(()=>{
    const fetchdata=async()=>{
        const response=await axios.get("http://localhost:8080/property/getallproperties");
        if(response.data.msg==="Fetched")
        {
          setProperties(response.data.properties)
        }
    }
    fetchdata();
  },[])

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

  const toggleSavedProperty = (id) => {
    setSavedProperties((prev) => {
      const newSaved = new Set(prev);
      if (newSaved.has(id)) {
        newSaved.delete(id);
      } else {
        newSaved.add(id);
      }
      return newSaved;
    });
  };


const handleSaveProperty = (property) => {
  setSavedProperties((prev) => [...prev, property]);
  alert("Property saved!");
};


  return (
    <>
      <TenantNavbar />
      <Container style={{ marginTop: "80px" }}>
        <Grid container spacing={3}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card
                sx={{
                  maxWidth: 400,
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
                onClick={(event) => openProperty(property, event)}
              >
                <CardMedia component="img" height="200" image={property.images[0]} alt={property.title} />
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

      {/* Full-Screen Property View */}
      <AnimatePresence>
        {selectedProperty && (
          <Backdrop open sx={{ zIndex: 999, backgroundColor: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(5px)" }}>
            <motion.div
              initial={{ x: position.x, y: position.y, width: position.width, height: position.height, opacity: 0.8 }}
              animate={{ x: "5vw", y: "10vh", width: "90vw", height: "80vh", opacity: 1, borderRadius: "10px" }}
              exit={{ x: position.x, y: position.y, width: position.width, height: position.height, opacity: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ position: "fixed", top: 0, left: 0, zIndex: 1000, backgroundColor: "white", padding: "20px" }}
            >
              <IconButton onClick={closeProperty} sx={{ position: "absolute", top: 10, right: 10 }}>
                <CloseIcon />
              </IconButton>

              {/* Horizontal Scroll for Images */}
              <Box sx={{ width: "100%", overflowX: "auto", display: "flex", gap: "10px", paddingBottom: "10px" }}>
                {selectedProperty.images.map((img, index) => (
                  <img key={index} src={img} alt="Property" style={{ height: "300px", width: "auto", borderRadius: "5px" }} />
                ))}
              </Box>

              {/* Two-Column Layout for Property Details */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h4">{selectedProperty.title}</Typography>
                  <Typography variant="h6">{selectedProperty.location}</Typography>
                  <Typography>Rent: ${selectedProperty.rent}</Typography>
                  <Typography>Type: {selectedProperty.type}</Typography>
                  <Typography>Bedrooms: {selectedProperty.bedrooms}</Typography>
                  <Typography>Bathrooms: {selectedProperty.bathrooms}</Typography>
                </Grid>

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
                  <Typography variant="subtitle2">Owner Contact: {selectedProperty.ownerphoneno}</Typography>

                  {/* Add to Saved Properties Button */}
                 <Button
  variant="contained"
  color="primary"
  sx={{
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1001,
    borderRadius: "20px",
    padding: "10px 20px",
  }}
  onClick={() => handleSaveProperty(selectedProperty)}
>
  Save Property
</Button>

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
