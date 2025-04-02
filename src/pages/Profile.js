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
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setUserInfo(user);
      setLoading(false);
    }
  }, [user]);

  const handleInputChange = (field) => (event) => {
    setUserInfo({
      ...userInfo,
      [field]: event.target.value
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      // Get the user ID from the current user object
      if (!user || !user.id) {
        throw new Error('User ID not found. Please log in again.');
      }

      console.log('Updating user:', user.id);
      console.log('Update data:', userInfo);

      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: userInfo.name,
          university: userInfo.university,
          location: userInfo.location
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      // Update the user context with the new data
      setUser({
        ...user,
        ...data
      });
      
      setIsEditing(false);
      setSuccess(true);
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message || 'Failed to update profile');
      // If token is invalid, redirect to login
      if (err.message.includes('token')) {
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!userInfo) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">User data not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4">Profile</Typography>
            <Button
              startIcon={isEditing ? <CloseIcon /> : <EditIcon />}
              onClick={() => setIsEditing(!isEditing)}
              color="primary"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 2,
                    bgcolor: 'primary.main'
                  }}
                >
                  {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : '?'}
                </Avatar>
                <Typography variant="h6">{userInfo.name || 'No Name'}</Typography>
                <Typography color="textSecondary">{userInfo.role || 'Student'}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Name"
                    secondary={
                      isEditing ? (
                        <TextField
                          fullWidth
                          value={userInfo.name || ''}
                          onChange={handleInputChange('name')}
                          size="small"
                        />
                      ) : (
                        userInfo.name || 'Not set'
                      )
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={userInfo.email || 'Not set'}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="University"
                    secondary={
                      isEditing ? (
                        <TextField
                          fullWidth
                          value={userInfo.university || ''}
                          onChange={handleInputChange('university')}
                          size="small"
                        />
                      ) : (
                        userInfo.university || 'Not set'
                      )
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Location"
                    secondary={
                      isEditing ? (
                        <TextField
                          fullWidth
                          value={userInfo.location || ''}
                          onChange={handleInputChange('location')}
                          size="small"
                        />
                      ) : (
                        userInfo.location || 'Not set'
                      )
                    }
                  />
                </ListItem>
              </List>

              {isEditing && (
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={loading}
                  >
                    Save Changes
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Profile; 