import { providers } from 'config/providers';

export const useProviderList = () => {
  const providerList = Object.values(providers);

  return {
    providerList,
  };
};
