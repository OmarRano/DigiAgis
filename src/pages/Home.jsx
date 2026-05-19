import React from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Box,
} from '@mui/material';
import {
  VerifiedUser,
  Search,
  Security,
  TrendingUp,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
          color: 'white',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Find Your Perfect Plot, Verified & Secure
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
            Nigeria's Trusted Digital Marketplace for AGIS-Verified Property Deals
          </Typography>
          
          {/* Search Bar */}
          <Box
            sx={{
              display: 'flex',
              maxWidth: 600,
              margin: '0 auto',
              backgroundColor: 'white',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            <input
              type="text"
              placeholder="Search by location, budget, or property type..."
              style={{
                flex: 1,
                border: 'none',
                padding: '12px 16px',
                fontSize: '16px',
                outline: 'none',
              }}
            />
            <Button
              variant="contained"
              sx={{
                borderRadius: 0,
                px: 4,
                backgroundColor: '#FF6F00',
                '&:hover': { backgroundColor: '#E65100' },
              }}
            >
              <Search sx={{ mr: 1 }} />
              Search
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Trust Indicators */}
      <Container sx={{ py: 2, textAlign: 'center' }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              ✅ AGIS-Verified Agents
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              🔒 Secure Document Handling
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              📈 500+ Successful Verifications
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Why Choose DigiAGIS?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <VerifiedUser sx={{ fontSize: 48, color: '#2E7D32', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Verified Agents
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All agents are AGIS-certified with verified credentials and trust scores
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Security sx={{ fontSize: 48, color: '#2E7D32', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Document Security
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Confidential document handling with secure verification status
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Search sx={{ fontSize: 48, color: '#2E7D32', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Instant Verification
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Request property verification and get matched with expert agents
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <TrendingUp sx={{ fontSize: 48, color: '#2E7D32', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Smart Matching
              </Typography>
              <Typography variant="body2" color="text.secondary">
                AI-powered matchmaking between buyers, sellers, and agents
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Ready to Start Your Verified Property Journey?
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
            Join thousands of trusted users and agents in Nigeria's first digital AGIS marketplace
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/signup"
            state={{ userType: 'buyer' }}
          >
            Join as User
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={RouterLink}
            to="/signup"
            state={{ userType: 'agent' }}
          >
            Join as Agent
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default Home;