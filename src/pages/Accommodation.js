import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Alert
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { useAuth } from '../context/AuthContext';

function Accommodation() {
  const [accommodations, setAccommodations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('/api/accommodations', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Please log in to view accommodations');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setAccommodations(data);
      } catch (error) {
        console.error('Error fetching accommodations:', error);
        setError(error.message || 'Failed to fetch accommodations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAccommodations();
    }
  }, [user]);

  const handleOpenDialog = (property) => {
    setSelectedProperty(property);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProperty(null);
  };

  const filteredAccommodations = accommodations.filter(acc => {
    const matchesSearch = acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         acc.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && acc.price < 150) ||
                        (priceRange === 'medium' && acc.price >= 150 && acc.price < 200) ||
                        (priceRange === 'high' && acc.price >= 200);
    return matchesSearch && matchesPrice;
  });

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

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
              {selectedProperty.coordinates && (
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
              )}

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