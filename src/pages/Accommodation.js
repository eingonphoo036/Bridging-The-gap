import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

function Accommodation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const accommodations = [
    {
      id: 1,
      name: 'Apollo Works',
      location: 'Coventry City Centre',
      address: '1-2 Far Gosford Street, Coventry, CV1 5EA',
      price: 165,
      rating: 4.5,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', // Modern building exterior
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', // Student room
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'  // Common area
      ],
      amenities: ['En-suite', 'Gym', 'Study Room', '24/7 Security'],
      description: 'Modern student accommodation in the heart of Coventry city centre, featuring stylish en-suite rooms and excellent facilities.',
      distance: '0.2 miles from Coventry University',
      walkingTime: '5 minutes',
      cyclingTime: '3 minutes',
      drivingTime: '2 minutes',
      coordinates: {
        lat: 52.4081,
        lng: -1.5106
      }
    },
    {
      id: 2,
      name: 'Code',
      location: 'Coventry City Centre',
      address: 'Gosford Street, Coventry, CV1 5DL',
      price: 155,
      rating: 4.3,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', // Modern building exterior
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', // Student room
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'  // Common area
      ],
      amenities: ['En-suite', 'Cinema Room', 'Games Room', 'Study Area'],
      description: 'Contemporary student living with premium amenities and a vibrant social scene.',
      distance: '0.3 miles from Coventry University',
      walkingTime: '7 minutes',
      cyclingTime: '4 minutes',
      drivingTime: '3 minutes',
      coordinates: {
        lat: 52.4075,
        lng: -1.5098
      }
    },
    {
      id: 3,
      name: 'CalCott Ten',
      location: 'Coventry City Centre',
      address: '10 Calcott Street, Coventry, CV1 5JN',
      price: 145,
      rating: 4.0,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', // Modern building exterior
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', // Student room
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'  // Common area
      ],
      amenities: ['En-suite', 'Common Room', 'Laundry', 'Bike Storage'],
      description: 'Comfortable and affordable student accommodation with essential amenities.',
      distance: '0.4 miles from Coventry University',
      walkingTime: '8 minutes',
      cyclingTime: '5 minutes',
      drivingTime: '4 minutes',
      coordinates: {
        lat: 52.4068,
        lng: -1.5089
      }
    },
    {
      id: 4,
      name: 'Gostford',
      location: 'Coventry City Centre',
      address: 'Far Gosford Street, Coventry, CV1 5EA',
      price: 160,
      rating: 4.4,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', // Modern building exterior
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', // Student room
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'  // Common area
      ],
      amenities: ['En-suite', 'Gym', 'Study Room', 'Social Space'],
      description: 'Premium student accommodation with modern facilities and excellent location.',
      distance: '0.2 miles from Coventry University',
      walkingTime: '5 minutes',
      cyclingTime: '3 minutes',
      drivingTime: '2 minutes',
      coordinates: {
        lat: 52.4081,
        lng: -1.5106
      }
    },
    {
      id: 5,
      name: 'Millennium Views',
      location: 'Coventry City Centre',
      address: 'Millennium Place, Coventry, CV1 1JD',
      price: 170,
      rating: 4.6,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', // Modern building exterior
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', // Student room
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'  // Common area
      ],
      amenities: ['En-suite', 'Gym', 'Cinema Room', 'Study Area'],
      description: 'Luxury student accommodation with stunning city views and premium facilities.',
      distance: '0.1 miles from Coventry University',
      walkingTime: '3 minutes',
      cyclingTime: '2 minutes',
      drivingTime: '1 minute',
      coordinates: {
        lat: 52.4092,
        lng: -1.5117
      }
    },
    {
      id: 6,
      name: 'Bishop Gate',
      location: 'Coventry City Centre',
      address: 'Bishop Street, Coventry, CV1 1JD',
      price: 175,
      rating: 4.7,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', // Modern building exterior
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', // Student room
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'  // Common area
      ],
      amenities: ['En-suite', 'Gym', 'Study Room', 'Social Space'],
      description: 'Premium student accommodation in the heart of Coventry city centre.',
      distance: '0.1 miles from Coventry University',
      walkingTime: '3 minutes',
      cyclingTime: '2 minutes',
      drivingTime: '1 minute',
      coordinates: {
        lat: 52.4092,
        lng: -1.5117
      }
    },
    {
      id: 7,
      name: 'Guson Garden',
      location: 'Coventry City Centre',
      address: 'Gosford Street, Coventry, CV1 5DL',
      price: 150,
      rating: 4.2,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', // Modern building exterior
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', // Student room
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'  // Common area
      ],
      amenities: ['En-suite', 'Common Room', 'Laundry', 'Bike Storage'],
      description: 'Comfortable student accommodation with garden views and essential amenities.',
      distance: '0.3 miles from Coventry University',
      walkingTime: '7 minutes',
      cyclingTime: '4 minutes',
      drivingTime: '3 minutes',
      coordinates: {
        lat: 52.4075,
        lng: -1.5098
      }
    },
    {
      id: 8,
      name: 'City Point',
      location: 'Coventry City Centre',
      address: 'New Union Street, Coventry, CV1 2NT',
      price: 165,
      rating: 4.4,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', // Modern building exterior
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', // Student room
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'  // Common area
      ],
      amenities: ['En-suite', 'Gym', 'Study Room', 'Social Space'],
      description: 'Modern student accommodation with excellent city centre location.',
      distance: '0.2 miles from Coventry University',
      walkingTime: '5 minutes',
      cyclingTime: '3 minutes',
      drivingTime: '2 minutes',
      coordinates: {
        lat: 52.4081,
        lng: -1.5106
      }
    },
    {
      id: 9,
      name: 'City Views',
      location: 'Coventry City Centre',
      address: 'New Union Street, Coventry, CV1 2NT',
      price: 180,
      rating: 4.8,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', // Modern building exterior
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', // Student room
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'  // Common area
      ],
      amenities: ['En-suite', 'Gym', 'Cinema Room', 'Study Area'],
      description: 'Luxury student accommodation with panoramic city views and premium facilities.',
      distance: '0.2 miles from Coventry University',
      walkingTime: '5 minutes',
      cyclingTime: '3 minutes',
      drivingTime: '2 minutes',
      coordinates: {
        lat: 52.4081,
        lng: -1.5106
      }
    },
  ];

  const handleOpenDialog = (property) => {
    setSelectedProperty(property);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProperty(null);
  };

  const filteredAccommodations = accommodations.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceRange === 'all' ||
                        (priceRange === 'low' && property.price <= 150) ||
                        (priceRange === 'medium' && property.price > 150 && property.price <= 170) ||
                        (priceRange === 'high' && property.price > 170);
    return matchesSearch && matchesPrice;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Find Your Perfect Accommodation
      </Typography>

      {/* Search and Filter Section */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          fullWidth
          label="Search by name or location"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Price Range</InputLabel>
          <Select
            value={priceRange}
            label="Price Range"
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <MenuItem value="all">All Prices</MenuItem>
            <MenuItem value="low">Under £150</MenuItem>
            <MenuItem value="medium">£150 - £170</MenuItem>
            <MenuItem value="high">Over £170</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Accommodation Listings */}
      <Grid container spacing={4}>
        {filteredAccommodations.map((property) => (
          <Grid item xs={12} md={6} lg={4} key={property.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #e0e0e0' }}>
              <CardMedia
                component="img"
                height="200"
                image={property.images[0]}
                alt={property.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {property.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOnIcon sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {property.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={property.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({property.rating})
                  </Typography>
                </Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  £{property.price}/week
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {property.amenities.slice(0, 3).map((amenity) => (
                    <Chip key={amenity} label={amenity} size="small" />
                  ))}
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleOpenDialog(property)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Property Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedProperty && (
          <>
            <DialogTitle>
              <Typography variant="h5">{selectedProperty.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {selectedProperty.address}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.name}
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                />
              </Box>
              <Typography variant="h6" gutterBottom>
                £{selectedProperty.price}/week
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedProperty.description}
              </Typography>

              {/* Travel Information */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Distance to Coventry University:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DirectionsWalkIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {selectedProperty.walkingTime} walk
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DirectionsBikeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {selectedProperty.cyclingTime} by bike
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DirectionsCarIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {selectedProperty.drivingTime} by car
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* Map */}
              <Box sx={{ mb: 2, height: '300px', width: '100%', border: '1px solid #e0e0e0' }}>
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedProperty.coordinates.lng - 0.01},${selectedProperty.coordinates.lat - 0.01},${selectedProperty.coordinates.lng + 0.01},${selectedProperty.coordinates.lat + 0.01}&layer=mapnik&marker=${selectedProperty.coordinates.lat},${selectedProperty.coordinates.lng}`}
                />
                <br />
                <small>
                  <a
                    href={`https://www.openstreetmap.org/?mlat=${selectedProperty.coordinates.lat}&mlon=${selectedProperty.coordinates.lng}&zoom=15`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Larger Map
                  </a>
                </small>
              </Box>

              <Typography variant="subtitle1" gutterBottom>
                Amenities:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedProperty.amenities.map((amenity) => (
                  <Chip key={amenity} label={amenity} />
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button variant="contained" color="primary">
                Contact Landlord
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}

export default Accommodation; 