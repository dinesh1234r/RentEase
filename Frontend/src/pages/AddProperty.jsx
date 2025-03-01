import React, { useState } from "react";
import axios from "axios";
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
  CircularProgress,
} from "@mui/material";
import OwnerNavbar from "../components/OwnerNavbar";
import { toast, ToastContainer } from "react-toastify";

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
    available: true,
    amenities: [], // ✅ Ensures it's always an array
    images: [],
    owner: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProperty({ ...property, [name]: checked });
  };

  const handleAmenitiesChange = (event) => {
    const value = event.target.value;
    setProperty({ ...property, amenities: Array.isArray(value) ? value : [] });
  };

  // ✅ Upload images to Cloudinary and store URLs
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0) {
      toast.error("Choose at least one photo");
      return;
    }

    setIsLoading(true);
    const uploadedImageURLs = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "f05bb7m0"); // Your Cloudinary Upload Preset

      try {
        const res = await axios.post(`https://api.cloudinary.com/v1_1/dyv9xgbfx/image/upload`, formData);
        uploadedImageURLs.push(res.data.secure_url);
      } catch (error) {
        toast.error("Error uploading photo");
      }
    }

    setProperty((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedImageURLs], // Add Cloudinary URLs
    }));

    setIsLoading(false);
    toast.success("Photos uploaded successfully!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Property Submitted:", property);

    try {
      property.owner=JSON.parse(localStorage.getItem("userinfo")).id;
      await axios.post("http://localhost:8080/property/register", property);
      toast.success("Property added successfully!");
    } catch (error) {
      toast.error("Error adding property");
    }
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

          {/* Fixed Amenities Select Issue */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Amenities</InputLabel>
            <Select
              multiple
              value={property.amenities || []} // ✅ Ensures it's always an array
              onChange={handleAmenitiesChange}
              renderValue={(selected) =>
                Array.isArray(selected) && selected.length > 0 ? (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                ) : (
                  "Select Amenities"
                )
              }
            >
              {amenitiesList.map((amenity) => (
                <MenuItem key={amenity} value={amenity}>
                  {amenity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel control={<Checkbox name="furnished" checked={property.furnished} onChange={handleCheckboxChange} />} label="Furnished" />
          <FormControlLabel control={<Checkbox name="available" checked={property.available} onChange={handleCheckboxChange} />} label="Available" />

          {/* Upload Images Button */}
          <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
            Upload Images
            <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
          </Button>

          {/* Loader while uploading */}
          {isLoading && <CircularProgress sx={{ display: "block", mx: "auto", mt: 2 }} />}

          {/* Preview Uploaded Images */}
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
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default AddProperty;
