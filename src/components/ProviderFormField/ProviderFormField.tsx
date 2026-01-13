import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  InputAdornment,
  IconButton,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { Visibility, VisibilityOff, KeyboardArrowDown } from '@mui/icons-material';
import type { ProviderFormFieldProps } from './ProviderFormFieldTypes';
import { useProviderFormField } from './hooks/useProviderFormField';
import styles from './ProviderFormField.module.css';

const ProviderFormField = ({ field: fieldConfig, control, clearErrors }: ProviderFormFieldProps) => {
  const { type, options, name, label, helperText } = fieldConfig;
  const {
    controllerField,
    error,
    showPassword,
    gridSize,
    inputType,
    handleTogglePasswordVisibility,
  } = useProviderFormField(fieldConfig, control, clearErrors);

  return (
    <Grid size={{ xs: 12, sm: gridSize }}>
      {type === 'select' && options ? (
        <Box>
          <Typography
            component="label"
            htmlFor={name}
            sx={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#060E1E',
            }}
          >
            {label}
          </Typography>
          <FormControl
            fullWidth
            error={!!error}
            className={styles.fieldWrapper}
            size="small"
          >
            <Select
              id={name}
              {...controllerField}
              value={controllerField.value || ''}
              IconComponent={KeyboardArrowDown}
              sx={{
                fontSize: '14px',
                color: '#060E1E',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#d0d0d0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#999',
                },
              }}
            >
              {options.map(({ value, label: optionLabel }) => (
                <MenuItem key={value} value={value} sx={{ 
                  fontSize: '14px',
                  color: '#060E1E',
                }}>
                  {optionLabel}
                </MenuItem>
              ))}
            </Select>
            {error && (
              <FormHelperText>
                {error.message}
              </FormHelperText>
            )}
            {!error && helperText && (
              <FormHelperText className={styles.helperText} >
                {helperText}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
      ) : (
        <Box>
          <Typography
            component="label"
            htmlFor={name}
            sx={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#060E1E',
            }}
          >
            {label}
          </Typography>
          <TextField
            {...controllerField}
            id={name}
            type={inputType}
            error={!!error}
            helperText={error ? error.message : helperText}
            fullWidth
            size="small"
            className={styles.textField}
            InputProps={{
              sx: { 
                fontSize: '14px',
                color: '#060E1E',
              },
              ...(type === 'password'
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : {}),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#d0d0d0',
                },
                '&:hover fieldset': {
                  borderColor: '#999',
                },
              },
            }}
          />
        </Box>
      )}
    </Grid>
  );
};

export default ProviderFormField;
