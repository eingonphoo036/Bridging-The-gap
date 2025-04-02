import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'secondary.main',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Welcome to Bridging The Gap
          </Typography>
          <Typography
            variant="h5"
            align="center"
            paragraph
            sx={{ mb: 4, color: 'secondary.main' }}
          >
            Your one-stop platform for finding accommodation and comparing prices
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/accommodation"
              variant="contained"
              color="secondary"
              size="large"
              sx={{ color: 'primary.main' }}
            >
              Find Accommodation
            </Button>
            <Button
              component={RouterLink}
              to="/living-costs"
              variant="outlined"
              color="secondary"
              size="large"
            >
              Compare Prices
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Why Choose Bridging The Gap?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', border: '1px solid #e0e0e0' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <ApartmentIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Find Your Perfect Home
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Browse through verified student accommodations near your university
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', border: '1px solid #e0e0e0' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <ShoppingCartIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Compare Prices
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Find the best deals on essential items and save money
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home; 