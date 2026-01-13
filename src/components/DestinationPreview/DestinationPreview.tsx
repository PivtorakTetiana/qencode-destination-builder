import { Box, Typography } from '@mui/material';
import type { DestinationPreviewProps } from './DestinationPreviewTypes';
import styles from './DestinationPreview.module.css';

const DestinationPreview = ({ destination }: DestinationPreviewProps) => {
  if (!destination) {
    return null;
  }

  const jsonOutput = {
    destination,
  };

  return (
    <Box className={styles.jsonContainer}>
      <Typography
        variant="h6"
        component="h3"
        sx={{ fontWeight: 600, fontSize: '16px', color: '#060E1E', marginBottom: 2 }}
      >
        Generated Configuration
      </Typography>

      <pre className={styles.jsonCode}>
        <code>{JSON.stringify(jsonOutput, null, 2)}</code>
      </pre>
    </Box>
  );
};

export default DestinationPreview;
