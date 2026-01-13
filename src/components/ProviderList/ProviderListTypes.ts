export type ProviderListProps = {
  onProviderSelect: (providerId: string) => void;
};

export type ProviderCardProps = {
  id: string;
  name: string;
  icon: string;
  onClick: () => void;
};
