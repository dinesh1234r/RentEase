import { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import axios from "axios";

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    fetchSavedProperties();
  }, []);

  const fetchSavedProperties = async () => {
    try {
      const response = await axios.post("http://localhost:8080/tenent/getwatchlist", {
        id: JSON.parse(localStorage.getItem("userinfo")).id
      });

      if (response.data && Array.isArray(response.data.watchlist)) {
        const propertyIds = response.data.watchlist;

        // Fetch details for each property
        const propertyDetails = await Promise.all(
          propertyIds.map(async (id) => {
            const propertyResponse = await axios.get(`http://localhost:8080/properties/${id}`);
            return propertyResponse.data;
          })
        );

        setSavedProperties(propertyDetails);
      } else {
        setSavedProperties([]); // Ensure it's an array
      }
    } catch (error) {
      console.error("Error fetching saved properties", error);
      setSavedProperties([]); // Ensure it doesn't break the .map function
    }
  };

  const removeFromSaved = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:8080/api/saved-properties/${propertyId}`, {
        id:JSON.parse(localStorage.getItem("userinfo")).id
      });
      setSavedProperties(savedProperties.filter((property) => property.id !== propertyId));
    } catch (error) {
      console.error("Error removing property", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Saved Properties
      </Typography>
      <Grid container spacing={3}>
        {savedProperties.length > 0 ? (
          savedProperties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={property.image || "https://via.placeholder.com/300"}
                  alt={property.title}
                />
                <CardContent>
                  <Typography variant="h6">{property.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {property.location} - ₹{property.rent}/month
                  </Typography>
                  <IconButton color="secondary" onClick={() => removeFromSaved(property.id)}>
                    <Favorite />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No saved properties found.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default SavedProperties;
