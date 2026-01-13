import { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import ProviderList from './components/ProviderList/ProviderList';
import ProviderForm from './components/ProviderForm/ProviderForm';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#060E1E',
      secondary: '#060E1E',
    },
  },
  typography: {
    fontFamily: '"Basis Grotesque Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    allVariants: {
      fontFamily: '"Basis Grotesque Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Basis Grotesque Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Basis Grotesque Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
          textTransform: 'none',
          fontWeight: 500,
          padding: '10px 24px',
          fontSize: '14px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          fontFamily: '"Basis Grotesque Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: '"Basis Grotesque Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
          fontSize: '14px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"Basis Grotesque Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Basis Grotesque Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: '"Basis Grotesque Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        },
      },
    },
  },
});

type WizardStep = 'provider-list' | 'provider-form';

function App() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('provider-list');
  const [selectedProviderId, setSelectedProviderId] = useState<string>('');

  const handleProviderSelect = (providerId: string) => {
    setSelectedProviderId(providerId);
    setCurrentStep('provider-form');
  };

  const handleCancel = () => {
    setCurrentStep('provider-list');
    setSelectedProviderId('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        {currentStep === 'provider-list' && (
          <ProviderList onProviderSelect={handleProviderSelect} />
        )}

        {currentStep === 'provider-form' && selectedProviderId && (
          <ProviderForm
            initialProviderId={selectedProviderId}
            onCancel={handleCancel}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
