import {
  Box,
  Card,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Grid,
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import type { ProviderFormProps } from './ProviderFormTypes';
import { useProviderForm } from './hooks/useProviderForm';
import ProviderFormField from 'components/ProviderFormField/ProviderFormField';
import DestinationPreview from 'components/DestinationPreview/DestinationPreview';
import { providers } from 'config/providers';
import styles from './ProviderForm.module.css';

const ProviderForm = ({ initialProviderId, onCancel }: ProviderFormProps) => {
  const {
    control,
    clearErrors,
    selectedProvider,
    currentProvider,
    destination,
    isSubmitting,
    isDirty,
    handleSubmit,
    handleProviderChange,
  } = useProviderForm(initialProviderId);

  const providerOptions = Object.values(providers);

  return (
    <Box className={styles.formContainer}>
      <Card className={styles.formCard} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
        <Box className={styles.formHeader}>
          <Typography
            variant="h5"
            component="h5"
            sx={{
              fontWeight: 500,
              fontSize: '16px',
              letterSpacing: '0.5px',
              color: '#060E1E',
              marginBottom: 1,
            }}
          >
            Third-Party Storage
          </Typography>
          
          <Typography
            variant="body2"
            component="p"
            sx={{
              marginBottom: "8px",
              fontWeight: 500,
              fontSize: '14px',
            }}
          >
            Choose Provider
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box className={styles.providerSelect}>
            <FormControl fullWidth size="small">
              <Select
                labelId="provider-select-label"
                value={selectedProvider}
                onChange={({ target: { value } }) => handleProviderChange(value)}
                IconComponent={KeyboardArrowDown}
                sx={{
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    color: '#060E1E',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#d0d0d0',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#999',
                  },
                }}
              >
                {providerOptions.map((provider) => {
                  const { id, icon: Icon, name } = provider;
                  return (
                    <MenuItem key={id} value={id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Icon size={24} />
                        <span style={{ 
                          fontSize: '14px',
                          color: '#060E1E',
                        }}>{name}</span>
                      </Box>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={2}>
            {currentProvider.fields.map((field) => {
              const { name } = field;
              return (
                <ProviderFormField
                  key={name}
                  field={field}
                  control={control}
                  clearErrors={clearErrors}
                />
              );
            })}
          </Grid>

          <Box className={styles.buttonGroup}>
            <Button
              variant="outlined"
              onClick={onCancel}
              disabled={isSubmitting}
              sx={{
                height: '36px',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px',
                borderColor: '#d0d0d0',
                color: '#060E1E',
                '&:hover': {
                  borderColor: '#999',
                  backgroundColor: '#f5f5f5',
                  color: '#060E1E',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || !isDirty}
              sx={{
                height: '36px',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px',
                backgroundColor: '#1976d2',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#e0e0e0',
                  color: '#999',
                },
              }}
            >
              Save
            </Button>
          </Box>
        </form>

        <DestinationPreview destination={destination} />
      </Card>
    </Box>
  );
};

export default ProviderForm;
