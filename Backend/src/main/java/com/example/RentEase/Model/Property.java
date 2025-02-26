package com.example.RentEase.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Property")
public class Property {
    @Id
    private String id;
    private String title;
    private String location;
    private Double rent;
    private String type;
    private int bedrooms;
    private int bathrooms;
    private Boolean furnished;
    private Boolean available;
    private List<String> amenities;
    private List<String> images;
    private String owner;

    public Property() {
    }

    public Property(String id, String title, String location, Double rent, String type, int bedrooms, int bathrooms, Boolean furnished, Boolean available, List<String> amenities, List<String> images, String owner) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.rent = rent;
        this.type = type;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.furnished = furnished;
        this.available = available;
        this.amenities = amenities;
        this.images = images;
        this.owner = owner;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getRent() {
        return rent;
    }

    public void setRent(Double rent) {
        this.rent = rent;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(int bedrooms) {
        this.bedrooms = bedrooms;
    }

    public int getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(int bathrooms) {
        this.bathrooms = bathrooms;
    }

    public Boolean getFurnished() {
        return furnished;
    }

    public void setFurnished(Boolean furnished) {
        this.furnished = furnished;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public List<String> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<String> amenities) {
        this.amenities = amenities;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    @Override
    public String toString() {
        return "Property{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", location='" + location + '\'' +
                ", rent=" + rent +
                ", type='" + type + '\'' +
                ", bedrooms=" + bedrooms +
                ", bathrooms=" + bathrooms +
                ", furnished=" + furnished +
                ", available=" + available +
                ", amenities=" + amenities +
                ", images=" + images +
                ", owner='" + owner + '\'' +
                '}';
    }
}
