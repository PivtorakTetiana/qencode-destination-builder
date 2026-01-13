import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import type { ProviderListProps } from './ProviderListTypes';
import { useProviderList } from './hooks/useProviderList';
import styles from './ProviderList.module.css';

const ProviderList = ({ onProviderSelect }: ProviderListProps) => {
  const { providerList } = useProviderList();

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 550 },
        maxWidth: { xs: '100%', sm: 550 },
        minHeight: 323,
        padding: '20px',
        border: '1.2px solid #D3D8DC',
        borderRadius: '8px',
      }}
    >
      <Typography
        variant="h5"
        component="h5"
        sx={{
          textAlign: 'left',
          marginBottom: "20px",
          fontWeight: 500,
          fontSize: '16px',
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

      <Grid container spacing={0} sx={{ gap: '10px', flexWrap: 'wrap' }}>
        {providerList.map((provider) => {
          const { id, icon: Icon, name } = provider;
          return (
            <Grid 
              key={id}
              sx={{ 
                width: { xs: '100%', sm: 'calc(50% - 5px)' },
                flexGrow: 0,
                flexShrink: 0,
              }}
            >
              <Card
                className={styles.providerCard}
                onClick={() => onProviderSelect(id)}
                elevation={0}
                sx={{
                  height: 44,
                  borderRadius: '6px',
                  backgroundColor: '#F6F8FA',
                  border: 'none',
                  '&:hover': {
                    backgroundColor: '#E8EDF2',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '12px !important',
                    gap: '8px',
                    height: '100%',
                  }}
                >
                  <Box className={styles.providerIcon}>
                    <Icon size={20} />
                  </Box>
                  <Typography
                    className={styles.providerName}
                    sx={{
                      fontSize: '14px',
                      fontWeight: 400,
                    }}
                  >
                    {name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProviderList;
