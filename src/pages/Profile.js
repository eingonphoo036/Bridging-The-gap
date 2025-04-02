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
  Switch,
  FormControlLabel,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AttachMoney as AttachMoneyIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    priceAlerts: true,
    roommateMatching: true,
    language: 'English',
  });

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
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(userInfo)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceChange = (preference) => (event) => {
    setPreferences({
      ...preferences,
      [preference]: event.target.checked,
    });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  margin: '0 auto 16px',
                  bgcolor: 'primary.main',
                }}
              >
                <PersonIcon sx={{ fontSize: 60 }} />
              </Avatar>
              <Typography variant="h6" gutterBottom>
                {userInfo.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {userInfo.university}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userInfo.major} • {userInfo.year}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Edit Profile Form */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={userInfo.name}
                    onChange={handleInputChange('name')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={userInfo.email}
                    onChange={handleInputChange('email')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={userInfo.phone}
                    onChange={handleInputChange('phone')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={userInfo.location}
                    onChange={handleInputChange('location')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="University"
                    value={userInfo.university}
                    onChange={handleInputChange('university')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Major"
                    value={userInfo.major}
                    onChange={handleInputChange('major')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Year"
                    value={userInfo.year}
                    onChange={handleInputChange('year')}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Preferences */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Preferences
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive updates about new properties and price changes"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.emailNotifications}
                        onChange={handlePreferenceChange('emailNotifications')}
                      />
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Price Alerts"
                    secondary="Get notified when prices change for your saved items"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.priceAlerts}
                        onChange={handlePreferenceChange('priceAlerts')}
                      />
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Roommate Matching"
                    secondary="Allow other students to find you for roommate matching"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.roommateMatching}
                        onChange={handlePreferenceChange('roommateMatching')}
                      />
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </Container>
  );
}

export default Profile; 