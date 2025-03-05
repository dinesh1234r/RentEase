import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import OwnerNavbar from "../components/OwnerNavbar";
import axios from "axios";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  // Dummy property data
  const [properties, setProperties] = useState([]);

  useEffect(()=>{
    const fetchProperty=async()=>{
        const response=await axios.post("https://rentease-backend-ysgh.onrender.com/property/getallproperties",{id:JSON.parse(localStorage.getItem("userinfo")).id})
        console.log(response.data)
        if(response.data.msg==="Properties Datas Reterived")
        {
          setProperties(response.data.properties);
        }
    }
    fetchProperty();
  },[])

  return (
    <>
      <OwnerNavbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Properties
        </Typography>

        {/* Horizontal Scrollable Box */}
        <Box sx={{ display: "flex", overflowX: "auto", gap: 2, pb: 2 }}>
          {properties.map((property) => (
            <Card key={property.id} sx={{ minWidth: 300, maxWidth: 350 }}>
              <Box sx={{ display: "flex", overflowX: "auto", gap: 1, p: 1 }}>
                {property.images.map((img, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                    image={img}
                    alt={`Thumbnail ${index}`}
                    sx={{ width: 80, height: 80, cursor: "pointer" }}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </Box>
              <CardContent>
                <Typography variant="h6">{property.title}</Typography>
                <Typography color="textSecondary">{property.location}</Typography>
                <Typography>Rent: ${property.rent}</Typography>
                <Typography>Type: {property.type}</Typography>
                <Typography>Bedrooms: {property.bedrooms}</Typography>
                <Typography>Bathrooms: {property.bathrooms}</Typography>
                <Typography>Furnished: {property.furnished ? "Yes" : "No"}</Typography>
                <Typography>Available: {property.available ? "Yes" : "No"}</Typography>
                <Typography variant="subtitle2">Amenities:</Typography>
                <List dense>
                  {property.amenities.map((amenity, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`• ${amenity}`} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="subtitle2">Owner: {property.owner}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Image Modal */}
        <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)}>
          <DialogContent>
            <IconButton
              onClick={() => setSelectedImage(null)}
              sx={{ position: "absolute", top: 10, right: 10 }}
            >
              <CloseIcon />
            </IconButton>
            <CardMedia component="img" image={selectedImage} sx={{ maxWidth: "100%" }} />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default OwnerDashboard;
