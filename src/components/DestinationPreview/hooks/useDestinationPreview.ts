import { useState } from 'react';

export const useDestinationPreview = (destination: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (destination) {
      const jsonString = JSON.stringify({ destination }, null, 2);
      navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return {
    copied,
    handleCopy,
  };
};
