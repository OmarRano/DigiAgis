import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  Assignment,
  VerifiedUser,
  Description,
  Person,
  Star,
  Message,
  CheckCircle,
  CloudUpload,
  AttachMoney,
  ScheduleSend,
} from '@mui/icons-material';

const Verification = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [verificationType, setVerificationType] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [documents, setDocuments] = useState([]);

  // Mock data
  const verificationTypes = [
    {
      id: 'c-of-o',
      name: 'C-of-O Verification',
      description: 'Verify authenticity of Certificate of Occupancy',
      price: 15000,
      duration: '24-48 hours',
      requirements: ['C-of-O copy', 'Property location', 'Owner details'],
    },
    {
      id: 'survey-plan',
      name: 'Survey Plan Verification',
      description: 'Confirm survey plan matches AGIS records',
      price: 12000,
      duration: '24 hours',
      requirements: ['Survey plan copy', 'Coordinates', 'Land dimensions'],
    },
    {
      id: 'agis-search',
      name: 'AGIS Record Search',
      description: 'Comprehensive search in AGIS database',
      price: 8000,
      duration: '12-24 hours',
      requirements: ['Property address', 'Owner name', 'Plot number'],
    },
    {
      id: 'title-verification',
      name: 'Title Document Verification',
      description: 'Verify all title documents authenticity',
      price: 20000,
      duration: '48-72 hours',
      requirements: ['All title documents', 'Previous transactions', 'Survey details'],
    },
    {
      id: 'encumbrance-check',
      name: 'Encumbrance Check',
      description: 'Check for liens, mortgages, or legal issues',
      price: 10000,
      duration: '24 hours',
      requirements: ['Property details', 'Owner information', 'Document copies'],
    },
  ];

  const availableAgents = [
    {
      id: 1,
      name: 'Chinedu Okoro',
      rating: 4.9,
      trustScore: 94,
      completedJobs: 128,
      responseTime: '1.2h',
      specialization: ['C-of-O', 'Survey Plans'],
      price: 15000,
      profileImage: '/api/placeholder/60/60',
      isOnline: true,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      rating: 4.8,
      trustScore: 92,
      completedJobs: 95,
      responseTime: '2.1h',
      specialization: ['AGIS Search', 'Encumbrance'],
      price: 12000,
      profileImage: '/api/placeholder/60/60',
      isOnline: true,
    },
    {
      id: 3,
      name: 'Mike Adebayo',
      rating: 4.7,
      trustScore: 88,
      completedJobs: 76,
      responseTime: '3.5h',
      specialization: ['Title Verification', 'Legal'],
      price: 18000,
      profileImage: '/api/placeholder/60/60',
      isOnline: false,
    },
  ];

  const verificationSteps = [
    {
      label: 'Select Verification Type',
      description: 'Choose the type of verification service you need',
    },
    {
      label: 'Upload Documents',
      description: 'Provide the required documents for verification',
    },
    {
      label: 'Choose Agent',
      description: 'Select a verified agent to handle your request',
    },
    {
      label: 'Review & Pay',
      description: 'Confirm details and make payment',
    },
    {
      label: 'Verification in Progress',
      description: 'Track your verification status',
    },
  ];

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleVerificationTypeSelect = (type) => {
    setVerificationType(type);
    handleNext();
  };

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
    handleNext();
  };

  const handleDocumentUpload = (event) => {
    const files = Array.from(event.target.files);
    setDocuments(prev => [...prev, ...files.map(file => ({
      id: Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadTime: new Date(),
    }))]);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <VerificationTypeStep onSelect={handleVerificationTypeSelect} types={verificationTypes} />;
      case 1:
        return <DocumentUploadStep documents={documents} onUpload={handleDocumentUpload} onNext={handleNext} />;
      case 2:
        return <AgentSelectionStep agents={availableAgents} onSelect={handleAgentSelect} selectedAgent={selectedAgent} />;
      case 3:
        return <ReviewStep verificationType={verificationTypes.find(t => t.id === verificationType)} agent={selectedAgent} documents={documents} onConfirm={handleNext} />;
      case 4:
        return <ProgressStep verificationType={verificationTypes.find(t => t.id === verificationType)} agent={selectedAgent} />;
      default:
        return 'Unknown step';
    }
  };

  const VerificationTypeStep = ({ onSelect, types }) => (
    <Box>
      <Typography variant="h6" gutterBottom>
        What would you like to verify?
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        Choose the verification service that matches your needs
      </Typography>
      
      <Grid container spacing={2}>
        {types.map((type) => (
          <Grid item xs={12} md={6} key={type.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                border: verificationType === type.id ? 2 : 1,
                borderColor: verificationType === type.id ? 'primary.main' : 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                  borderColor: 'primary.main'
                }
              }}
              onClick={() => onSelect(type.id)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {type.name}
                  </Typography>
                  <Chip 
                    label={`₦${type.price.toLocaleString()}`} 
                    color="primary" 
                    variant="filled"
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {type.description}
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 2 }}>
                  ⏱️ {type.duration}
                </Typography>
                
                <Divider sx={{ my: 1 }} />
                
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  Requirements:
                </Typography>
                <List dense>
                  {type.requirements.map((req, index) => (
                    <ListItem key={index} sx={{ py: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                      </ListItemIcon>
                      <ListItemText primary={req} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const DocumentUploadStep = ({ documents, onUpload, onNext }) => {
    const selectedType = verificationTypes.find(t => t.id === verificationType);
    
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Upload Required Documents
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
          Please upload clear copies of the following documents
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* Upload Area */}
            <Paper
              sx={{
                p: 4,
                border: '2px dashed',
                borderColor: 'divider',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'action.hover'
                }
              }}
              onClick={() => document.getElementById('document-upload').click()}
            >
              <input
                id="document-upload"
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={onUpload}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              
              <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Click to upload documents
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Supported formats: PDF, JPG, PNG, DOC (Max 10MB each)
              </Typography>
            </Paper>

            {/* Uploaded Documents */}
            {documents.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Uploaded Documents ({documents.length})
                </Typography>
                <List>
                  {documents.map((doc, index) => (
                    <ListItem
                      key={doc.id}
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 1,
                      }}
                    >
                      <ListItemIcon>
                        <Description color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={doc.name}
                        secondary={`${(doc.size / 1024 / 1024).toFixed(2)} MB • Uploaded ${doc.uploadTime.toLocaleTimeString()}`}
                      />
                      <Chip label="Uploaded" color="success" size="small" />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Assignment sx={{ mr: 1 }} />
                Required Documents
              </Typography>
              
              {selectedType && (
                <List dense>
                  {selectedType.requirements.map((req, index) => (
                    <ListItem key={index}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                      </ListItemIcon>
                      <ListItemText primary={req} />
                    </ListItem>
                  ))}
                </List>
              )}
              
              <Alert severity="info" sx={{ mt: 2 }}>
                Ensure documents are clear and all details are visible. Blurry documents may delay verification.
              </Alert>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            onClick={onNext}
            disabled={documents.length === 0}
          >
            Continue to Agent Selection
          </Button>
        </Box>
      </Box>
    );
  };

  const AgentSelectionStep = ({ agents, onSelect, selectedAgent }) => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Choose a Verification Agent
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        Select from our verified AGIS agents to handle your verification request
      </Typography>

      <Grid container spacing={2}>
        {agents.map((agent) => (
          <Grid item xs={12} key={agent.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                border: selectedAgent?.id === agent.id ? 2 : 1,
                borderColor: selectedAgent?.id === agent.id ? 'primary.main' : 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                }
              }}
              onClick={() => onSelect(agent)}
            >
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Box sx={{ position: 'relative' }}>
                      <Avatar src={agent.profileImage} sx={{ width: 60, height: 60 }} />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 2,
                          right: 2,
                          width: 12,
                          height: 12,
                          backgroundColor: agent.isOnline ? 'success.main' : 'grey.500',
                          borderRadius: '50%',
                          border: '2px solid white'
                        }}
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" sx={{ mr: 1 }}>
                        {agent.name}
                      </Typography>
                      <VerifiedUser sx={{ color: 'primary.main', fontSize: 18 }} />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Star sx={{ color: '#FF9800', fontSize: 18, mr: 0.5 }} />
                        <Typography variant="body2">{agent.rating}</Typography>
                      </Box>
                      
                      <Chip 
                        label={`Trust Score: ${agent.trustScore}`} 
                        color="success" 
                        size="small" 
                        variant="outlined"
                      />
                      
                      <Typography variant="body2" color="text.secondary">
                        {agent.completedJobs} jobs
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      {agent.specialization.map((spec, index) => (
                        <Chip key={index} label={spec} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </Grid>
                  
                  <Grid item>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" color="primary" gutterBottom>
                        ₦{agent.price.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ⏱️ {agent.responseTime} avg response
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedAgent && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Selected: <strong>{selectedAgent.name}</strong> - Trust Score: {selectedAgent.trustScore}
        </Alert>
      )}
    </Box>
  );

  const ReviewStep = ({ verificationType, agent, documents, onConfirm }) => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Your Verification Request
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        Please confirm all details before proceeding with payment
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            {/* Service Details */}
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Assignment sx={{ mr: 1 }} />
              Service Details
            </Typography>
            
            {verificationType && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">
                    <strong>Service Type:</strong> {verificationType.name}
                  </Typography>
                  <Typography variant="body1" color="primary">
                    <strong>₦{verificationType.price.toLocaleString()}</strong>
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {verificationType.description}
                </Typography>
              </Box>
            )}

            {/* Agent Details */}
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
              <Person sx={{ mr: 1 }} />
              Selected Agent
            </Typography>
            
            {agent && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar src={agent.profileImage} sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {agent.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Star sx={{ color: '#FF9800', fontSize: 16 }} />
                    <Typography variant="body2">{agent.rating} • Trust Score: {agent.trustScore}</Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Documents */}
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Description sx={{ mr: 1 }} />
              Documents ({documents.length})
            </Typography>
            
            <List dense>
              {documents.map((doc, index) => (
                <ListItem key={doc.id}>
                  <ListItemIcon>
                    <Description color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={doc.name} />
                  <Chip label="Ready" color="success" size="small" />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Service Fee</Typography>
                <Typography>₦{verificationType?.price.toLocaleString()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Platform Fee</Typography>
                <Typography>₦2,000</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>VAT (7.5%)</Typography>
                <Typography>₦{(verificationType?.price * 0.075).toLocaleString()}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">
                  ₦{verificationType ? Math.round(verificationType.price * 1.075 + 2000).toLocaleString() : '0'}
                </Typography>
              </Box>
            </Box>

            <Button variant="contained" fullWidth size="large" onClick={onConfirm}>
              <AttachMoney sx={{ mr: 1 }} />
              Proceed to Payment
            </Button>
            
            <Alert severity="info" sx={{ mt: 2 }}>
              You'll be redirected to a secure payment gateway. Your verification will start immediately after payment confirmation.
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  const ProgressStep = ({ verificationType, agent }) => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
      
      <Typography variant="h4" gutterBottom color="success.main">
        Verification Request Submitted!
      </Typography>
      
      <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Your {verificationType?.name} request has been received and assigned to {agent?.name}
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 600, margin: '0 auto' }}>
        <Typography variant="h6" gutterBottom>
          What happens next?
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <ScheduleSend color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Agent Notification"
              secondary="Your assigned agent has been notified and will start working on your request within 1 hour"
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <Description color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Document Review"
              secondary="The agent will review your uploaded documents and may request additional information if needed"
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <VerifiedUser color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="AGIS Verification"
              secondary="The agent will conduct the necessary checks and verification with AGIS records"
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <Assignment color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Report Generation"
              secondary="You'll receive a comprehensive verification report with findings and recommendations"
            />
          </ListItem>
        </List>

        <Box sx={{ mt: 3 }}>
          <LinearProgress variant="determinate" value={25} sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Initial processing - Estimated completion: {verificationType?.duration}
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button variant="outlined" startIcon={<Message />}>
          Message Agent
        </Button>
        <Button variant="contained" startIcon={<Assignment />}>
          View Dashboard
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Property Verification
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Get your property documents verified by certified AGIS agents
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Stepper */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {verificationSteps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === verificationSteps.length - 1 ? (
                        <Typography variant="caption">Final step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2">{step.description}</Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>

            {activeStep > 0 && activeStep < verificationSteps.length - 1 && (
              <Button onClick={handleBack} sx={{ mt: 2 }}>
                Back
              </Button>
            )}
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>
            {getStepContent(activeStep)}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Verification;