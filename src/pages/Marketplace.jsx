import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Slider,
  InputAdornment,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Avatar,
  Rating,
} from '@mui/material';
import {
  Search,
  FilterList,
  LocationOn,
  FavoriteBorder,
  Share,
  VerifiedUser,
  Star,
  BusinessCenter,
  Map,
  List,
  GridView,
  Message,
  Close,
  Phone,
} from '@mui/icons-material';
import PaymentModal from '../components/verification/PaymentModal';

const Marketplace = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentModalProperty, setPaymentModalProperty] = useState(null);
  const [filters, setFilters] = useState({
    propertyType: '',
    location: '',
    minPrice: 0,
    maxPrice: 500000000,
    titleType: '',
    verificationStatus: '',
  });

  // Mock property data
  const properties = [
    {
      id: 1,
      title: 'Premium Plot in Maitama',
      location: 'Maitama, Abuja',
      price: 45000000,
      size: '500 sqm',
      propertyType: 'residential',
      titleType: 'C-of-O',
      verificationStatus: 'verified',
      images: ['/api/placeholder/400/300'],
      agent: {
        name: 'Chinedu Okoro',
        rating: 4.9,
        trustScore: 94,
        verified: true,
        profileImage: '/api/placeholder/40/40',
      },
      coordinates: { lat: 9.0765, lng: 7.3986 },
      features: ['Prime Location', 'Good Road Network', 'Drainage'],
      datePosted: '2024-01-15',
      views: 124,
      likes: 18,
    },
    {
      id: 2,
      title: 'Commercial Land in Wuse Zone 4',
      location: 'Wuse Zone 4, Abuja',
      price: 85000000,
      size: '800 sqm',
      propertyType: 'commercial',
      titleType: 'R-of-O',
      verificationStatus: 'verified',
      images: ['/api/placeholder/400/300'],
      agent: {
        name: 'Sarah Johnson',
        rating: 4.8,
        trustScore: 92,
        verified: true,
        profileImage: '/api/placeholder/40/40',
      },
      coordinates: { lat: 9.0765, lng: 7.3986 },
      features: ['High Commercial Value', 'Main Road', 'Security'],
      datePosted: '2024-01-14',
      views: 89,
      likes: 12,
    },
    {
      id: 3,
      title: 'Affordable Plot in Kubwa',
      location: 'Kubwa, Abuja',
      price: 12000000,
      size: '300 sqm',
      propertyType: 'residential',
      titleType: 'Governor\'s Consent',
      verificationStatus: 'pending',
      images: ['/api/placeholder/400/300'],
      agent: {
        name: 'Mike Adebayo',
        rating: 4.7,
        trustScore: 88,
        verified: true,
        profileImage: '/api/placeholder/40/40',
      },
      coordinates: { lat: 9.1765, lng: 7.2986 },
      features: ['Developing Area', 'Accessible', 'Affordable'],
      datePosted: '2024-01-13',
      views: 156,
      likes: 23,
    },
    {
      id: 4,
      title: 'Luxury Villa Plot in Asokoro',
      location: 'Asokoro, Abuja',
      price: 120000000,
      size: '1000 sqm',
      propertyType: 'residential',
      titleType: 'C-of-O',
      verificationStatus: 'verified',
      images: ['/api/placeholder/400/300'],
      agent: {
        name: 'Grace Okafor',
        rating: 5.0,
        trustScore: 98,
        verified: true,
        profileImage: '/api/placeholder/40/40',
      },
      coordinates: { lat: 9.0665, lng: 7.5186 },
      features: ['Exclusive Area', '24/7 Security', 'Landscaped'],
      datePosted: '2024-01-12',
      views: 67,
      likes: 15,
    },
    {
      id: 5,
      title: 'Industrial Land in Idu',
      location: 'Idu Industrial Area, Abuja',
      price: 65000000,
      size: '2000 sqm',
      propertyType: 'industrial',
      titleType: 'C-of-O',
      verificationStatus: 'verified',
      images: ['/api/placeholder/400/300'],
      agent: {
        name: 'James Mohammed',
        rating: 4.6,
        trustScore: 85,
        verified: true,
        profileImage: '/api/placeholder/40/40',
      },
      coordinates: { lat: 9.0865, lng: 7.3386 },
      features: ['Industrial Zone', 'Heavy Duty Access', 'Utilities'],
      datePosted: '2024-01-11',
      views: 45,
      likes: 8,
    },
    {
      id: 6,
      title: 'Plot with Duplex in Gwarinpa',
      location: 'Gwarinpa, Abuja',
      price: 75000000,
      size: '600 sqm',
      propertyType: 'residential',
      titleType: 'C-of-O',
      verificationStatus: 'pending',
      images: ['/api/placeholder/400/300'],
      agent: {
        name: 'Bola Ahmed',
        rating: 4.4,
        trustScore: 82,
        verified: true,
        profileImage: '/api/placeholder/40/40',
      },
      coordinates: { lat: 9.0965, lng: 7.3986 },
      features: ['Existing Structure', 'Gated Community', 'Parking'],
      datePosted: '2024-01-10',
      views: 178,
      likes: 31,
    },
  ];

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `₦${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `₦${(price / 1000).toFixed(1)}K`;
    }
    return `₦${price}`;
  };

  const getVerificationChip = (status) => {
    const config = {
      verified: { color: 'success', label: 'Verified', icon: <VerifiedUser /> },
      pending: { color: 'warning', label: 'Pending Verification', icon: <BusinessCenter /> },
      unverified: { color: 'error', label: 'Not Verified', icon: <Close /> },
    };
    
    const { color, label, icon } = config[status] || config.unverified;
    
    return (
      <Chip
        icon={icon}
        label={label}
        color={color}
        size="small"
        variant="filled"
      />
    );
  };

  const PropertyCard = ({ property }) => (
    <Card 
      sx={{ 
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6
        }
      }}
      onClick={() => setSelectedProperty(property)}
    >
      <Box sx={{ position: 'relative' }}>
        {/* Property Image */}
        <Box
          sx={{
            height: 200,
            background: `linear-gradient(45deg, #2E7D32, #4CAF50)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px'
          }}
        >
          📍 {property.location}
        </Box>

        {/* Verification Badge */}
        <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
          {getVerificationChip(property.verificationStatus)}
        </Box>

        {/* Like Button */}
        <IconButton
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'white',
            '&:hover': { backgroundColor: 'white' }
          }}
        >
          <FavoriteBorder />
        </IconButton>
      </Box>

      <CardContent>
        {/* Price */}
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          {formatPrice(property.price)}
        </Typography>

        {/* Title */}
        <Typography variant="h6" gutterBottom sx={{ height: 48, overflow: 'hidden' }}>
          {property.title}
        </Typography>

        {/* Location */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {property.location}
          </Typography>
        </Box>

        {/* Property Details */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body2">
            📏 {property.size}
          </Typography>
          <Typography variant="body2">
            🏷️ {property.titleType}
          </Typography>
        </Box>

        {/* Features */}
        <Box sx={{ mb: 2 }}>
          {property.features.slice(0, 2).map((feature, index) => (
            <Chip
              key={index}
              label={feature}
              size="small"
              variant="outlined"
              sx={{ mr: 0.5, mb: 0.5 }}
            />
          ))}
          {property.features.length > 2 && (
            <Chip
              label={`+${property.features.length - 2}`}
              size="small"
              variant="outlined"
            />
          )}
        </Box>

        {/* Agent Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }} src={property.agent.profileImage}>
              {property.agent.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="bold">
                {property.agent.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Star sx={{ fontSize: 16, color: '#FF9800', mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {property.agent.rating}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              👁️ {property.views}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ❤️ {property.likes}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const PropertyDetailModal = ({ property, open, onClose }) => {
    if (!property) return null;

    return (
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" fontWeight="bold">
              {property.title}
            </Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={3}>
            {/* Images and Map */}
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    height: 400,
                    background: `linear-gradient(45deg, #2E7D32, #4CAF50)`,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '18px',
                    mb: 2
                  }}
                >
                  Property Images Gallery
                </Box>
                
                {/* Map Preview */}
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Map sx={{ mr: 1 }} />
                    Location Map
                  </Typography>
                  <Box
                    sx={{
                      height: 200,
                      background: '#e0e0e0',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666'
                    }}
                  >
                    Interactive Map View
                  </Box>
                </Paper>
              </Box>
            </Grid>

            {/* Property Details */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
                <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
                  {formatPrice(property.price)}
                </Typography>

                {getVerificationChip(property.verificationStatus)}

                <Box sx={{ my: 3 }}>
                  <Typography variant="body1" gutterBottom>
                    📏 <strong>Size:</strong> {property.size}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    🏷️ <strong>Title Type:</strong> {property.titleType}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    📍 <strong>Location:</strong> {property.location}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    📅 <strong>Posted:</strong> {new Date(property.datePosted).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Features:
                  </Typography>
                  <Grid container spacing={1}>
                    {property.features.map((feature, index) => (
                      <Grid item xs={6} key={index}>
                        <Chip label={feature} variant="outlined" size="small" />
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Agent Card */}
                <Paper sx={{ p: 2, backgroundColor: '#f5f5f5', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ width: 50, height: 50, mr: 2 }} src={property.agent.profileImage}>
                      {property.agent.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {property.agent.name}
                        {property.agent.verified && (
                          <VerifiedUser sx={{ color: '#2E7D32', ml: 0.5, fontSize: 18 }} />
                        )}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={property.agent.rating} readOnly size="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          ({property.agent.trustScore} Trust Score)
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" fullWidth startIcon={<Message />}>
                      Message
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<Phone />}>
                      Call
                    </Button>
                  </Box>
                </Paper>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ mb: 1 }}
                  onClick={() => {
                    setPaymentModalProperty(property);
                    setPaymentModalOpen(true);
                  }}
                >
                  Request Verification
                </Button>
                <Button variant="outlined" fullWidth startIcon={<Share />}>
                  Share Property
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Property Marketplace
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover verified properties with AGIS-backed documentation
        </Typography>
      </Box>

      {/* Search and Filter Bar */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by location, property type, or title..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Property Type</InputLabel>
              <Select
                value={filters.propertyType}
                label="Property Type"
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="residential">Residential</MenuItem>
                <MenuItem value="commercial">Commercial</MenuItem>
                <MenuItem value="industrial">Industrial</MenuItem>
                <MenuItem value="agricultural">Agricultural</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={filters.location}
                label="Location"
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <MenuItem value="">All Areas</MenuItem>
                <MenuItem value="maitama">Maitama</MenuItem>
                <MenuItem value="asokoro">Asokoro</MenuItem>
                <MenuItem value="gwarinpa">Gwarinpa</MenuItem>
                <MenuItem value="wuse">Wuse</MenuItem>
                <MenuItem value="kubwa">Kubwa</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Verification</InputLabel>
              <Select
                value={filters.verificationStatus}
                label="Verification"
                onChange={(e) => handleFilterChange('verificationStatus', e.target.value)}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="verified">Verified Only</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button variant="contained" fullWidth startIcon={<FilterList />}>
              More Filters
            </Button>
          </Grid>
        </Grid>

        {/* Price Range Slider */}
        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom>
            Price Range: {formatPrice(filters.minPrice)} - {formatPrice(filters.maxPrice)}
          </Typography>
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            onChange={(e, newValue) => {
              handleFilterChange('minPrice', newValue[0]);
              handleFilterChange('maxPrice', newValue[1]);
            }}
            min={0}
            max={500000000}
            step={1000000}
            valueLabelDisplay="auto"
            valueLabelFormat={formatPrice}
          />
        </Box>
      </Paper>

      {/* Results Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          {properties.length} Properties Found
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            color={viewMode === 'list' ? 'primary' : 'default'}
            onClick={() => setViewMode('list')}
          >
            <List />
          </IconButton>
          <IconButton 
            color={viewMode === 'grid' ? 'primary' : 'default'}
            onClick={() => setViewMode('grid')}
          >
            <GridView />
          </IconButton>
        </Box>
      </Box>

      {/* Properties Grid */}
      <Grid container spacing={3}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} lg={4} key={property.id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination count={10} color="primary" />
      </Box>

      {/* Property Detail Modal */}
      <PaymentModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        property={paymentModalProperty}
        agent={paymentModalProperty?.agent}
      />

      <PropertyDetailModal 
        property={selectedProperty}
        open={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </Box>
  );
};

export default Marketplace;