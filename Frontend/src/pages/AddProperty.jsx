import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Chip,
} from "@mui/material";
import OwnerNavbar from "../components/OwnerNavbar";

const amenitiesList = ["WiFi", "Gym", "Swimming Pool", "Parking", "AC", "Security"];

const AddProperty = () => {
  const [property, setProperty] = useState({
    title: "",
    location: "",
    rent: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    furnished: false,
    available: false,
    amenities: [],
    images: [],
    owner: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProperty({ ...property, [name]: checked });
  };

  const handleAmenitiesChange = (event) => {
    setProperty({ ...property, amenities: event.target.value });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setProperty({ ...property, images: [...property.images, ...fileURLs] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property Submitted:", property);
    // Send data to API here (POST request)
  };

  return (
    <>
      <OwnerNavbar />
      <Container sx={{ mt: 10, maxWidth: 600 }}>
        <Typography variant="h4" gutterBottom>
          Add Property
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Title" name="title" value={property.title} onChange={handleChange} margin="normal" required />

          <TextField fullWidth label="Location" name="location" value={property.location} onChange={handleChange} margin="normal" required />

          <TextField fullWidth type="number" label="Rent" name="rent" value={property.rent} onChange={handleChange} margin="normal" required />

          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select name="type" value={property.type} onChange={handleChange} required>
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="Studio">Studio</MenuItem>
              <MenuItem value="Villa">Villa</MenuItem>
            </Select>
          </FormControl>

          <TextField fullWidth type="number" label="Bedrooms" name="bedrooms" value={property.bedrooms} onChange={handleChange} margin="normal" required />

          <TextField fullWidth type="number" label="Bathrooms" name="bathrooms" value={property.bathrooms} onChange={handleChange} margin="normal" required />

          <FormControl fullWidth margin="normal">
            <InputLabel>Amenities</InputLabel>
            <Select multiple value={property.amenities} onChange={handleAmenitiesChange} renderValue={(selected) => <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{selected.map((value) => <Chip key={value} label={value} />)}</Box>}>
              {amenitiesList.map((amenity) => (
                <MenuItem key={amenity} value={amenity}>
                  {amenity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel control={<Checkbox name="furnished" checked={property.furnished} onChange={handleCheckboxChange} />} label="Furnished" />
          <FormControlLabel control={<Checkbox name="available" checked={property.available} onChange={handleCheckboxChange} />} label="Available" />

         

          <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
            Upload Images
            <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
          </Button>

          <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
            {property.images.map((img, index) => (
              <img key={index} src={img} alt="Uploaded" width={80} height={80} style={{ borderRadius: 5 }} />
            ))}
          </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

export default AddProperty;
