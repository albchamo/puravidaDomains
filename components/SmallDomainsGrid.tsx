// components/SmallDomainsGrid.tsx
import React from 'react';
import DomainCard from './DomainCard';
import styles from './SmallDomainsGrid.module.css';
import { Domain } from '../utils/types';

type SmallDomainsGridProps = {
  domains: Domain[];
};

const SmallDomainsGrid: React.FC<SmallDomainsGridProps> = ({ domains }) => {
    if (!domains || domains.length === 0) {
      return <div>No additional domains to display.</div>;
    }
  
    return (
        <div className={styles.parentcontainer  }>  
    <div className={styles.grid}>
        {domains && domains.map(domain => (
        <DomainCard key={domain.id} domain={domain} />
      ))}
    </div>
    </div>
  );
};

export default SmallDomainsGrid;
