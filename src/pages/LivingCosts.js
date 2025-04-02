import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Divider,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../context/AuthContext';

function LivingCosts() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [retailers, setRetailers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPriceComparisons = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('/api/price-comparisons', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Please log in to view price comparisons');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategory(data[0].category);
        }
      } catch (error) {
        console.error('Error fetching price comparisons:', error);
        setError(error.message || 'Failed to fetch price comparisons. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPriceComparisons();
    }
  }, [user]);

  // Update retailers when category changes
  useEffect(() => {
    if (selectedCategory && categories.length > 0) {
      const category = categories.find(cat => cat.category === selectedCategory);
      if (category && category.items.length > 0) {
        // Get all unique retailers from the items in the selected category
        const allRetailers = new Set();
        category.items.forEach(item => {
          Object.keys(item.prices).forEach(retailer => allRetailers.add(retailer));
        });
        setRetailers(Array.from(allRetailers));
      } else {
        setRetailers([]);
      }
    }
  }, [selectedCategory, categories]);

  const filteredItems = selectedCategory
    ? categories
        .find(cat => cat.category === selectedCategory)
        ?.items.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) || []
    : [];

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
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Price Comparisons
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category.category} value={category.category}>
                    {category.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Search Items"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.name}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Prices:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {Object.entries(item.prices).map(([retailer, price]) => (
                      <Chip 
                        key={retailer} 
                        label={`${retailer}: £${price.toFixed(2)}`} 
                        color="primary" 
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Category: {selectedCategory}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default LivingCosts; 