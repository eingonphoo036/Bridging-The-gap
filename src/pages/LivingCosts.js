import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

function LivingCosts() {
  const [newItem, setNewItem] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');
  const [shoppingList, setShoppingList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceComparisons, setPriceComparisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stores = [
    { id: 'tesco', name: 'Tesco', location: 'City Center' },
    { id: 'primark', name: 'Primark', location: 'High Street' },
    { id: 'argos', name: 'Argos', location: 'Shopping Mall' },
    { id: 'sainsburys', name: "Sainsbury's", location: 'City Center' },
    { id: 'aldi', name: 'Aldi', location: 'High Street' },
    { id: 'bm', name: 'B&M', location: 'Shopping Mall' },
    { id: 'currys', name: 'Currys', location: 'Retail Park' },
    { id: 'johnlewis', name: 'John Lewis', location: 'City Center' }
  ];

  useEffect(() => {
    const fetchPriceComparisons = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching price comparisons...');
        const response = await fetch('/api/price-comparisons');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched data:', data);
        
        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }
        
        setPriceComparisons(data);
      } catch (err) {
        console.error('Error fetching price comparisons:', err);
        setError(err.message || 'Failed to fetch price comparisons');
      } finally {
        setLoading(false);
      }
    };

    fetchPriceComparisons();
  }, []);

  const handleAddItem = () => {
    if (newItem.trim()) {
      setShoppingList([...shoppingList, { id: Date.now(), name: newItem }]);
      setNewItem('');
    }
  };

  const handleDeleteItem = (id) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
  };

  const filteredCategories = priceComparisons.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Price Comparison
      </Typography>

      {/* Search and Store Selection */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          fullWidth
          label="Search items"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Store</InputLabel>
          <Select
            value={selectedStore}
            label="Select Store"
            onChange={(e) => setSelectedStore(e.target.value)}
          >
            <MenuItem value="all">All Stores</MenuItem>
            {stores.map((store) => (
              <MenuItem key={store.id} value={store.id}>
                {store.name} - {store.location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Price Comparison Grid */}
      {filteredCategories.map((category) => (
        <Box key={category.category} sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            {category.category}
          </Typography>
          <Grid container spacing={3}>
            {category.items.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={item.name}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: 3
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: 200,
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {stores.map((store) => (
                        <Typography 
                          key={store.id} 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            mb: 0.5
                          }}
                        >
                          <span>{store.name}:</span>
                          <span>£{item.prices[store.id].toFixed(2)}</span>
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {/* Shopping List */}
      <Card sx={{ mt: 6, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Shopping List
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              label="Add item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
            />
            <IconButton color="primary" onClick={handleAddItem}>
              <AddIcon />
            </IconButton>
          </Box>
          <List>
            {shoppingList.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}

export default LivingCosts; 