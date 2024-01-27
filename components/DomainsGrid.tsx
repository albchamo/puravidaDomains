// components/DomainsGrid.tsx
import React from 'react';
import DomainCard from './DomainCard';
import styles from './DomainsGrid.module.css';

// Update your Domain type to reflect that image_url can be null
type Domain = {
  id: number;
  domain_name: string;
  meta_description: string;
  title: string;
  price: number;
  description: string;
  image_url: string ; // Allow for null
};

// Update DomainsGridProps to use the updated Domain type
type DomainsGridProps = {
  domains: Domain[];
};

const DomainsGrid: React.FC<DomainsGridProps> = ({ domains }) => {
  return (
    <div className={styles.grid}>
      {domains.map((domain) => (
        <DomainCard key={domain.id} domain={domain} />
      ))}
    </div>
  );
};

export default DomainsGrid;
