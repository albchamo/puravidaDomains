// components/DomainCard.tsx
import React from 'react';
import Link from 'next/link'; // Import Link from next/link
import styles from './DomainCard.module.css';

// Ensure this matches the Domain type used in DomainsGrid.tsx
type Domain = {
  id: number;
  domain_name: string;
  description: string;
  image_url: string | null; // Allow for null
};

type DomainCardProps = {
  domain: Domain;
};

const DomainCard: React.FC<DomainCardProps> = ({ domain }) => {

  const domainSlug = encodeURIComponent(domain.domain_name);

    return (
      <Link href={`/domains/${domainSlug}`} passHref> {/* Wrap the card content with Link */}

      <div className={styles.card}>
        <div className={styles.imageContainer}>
        {domain.image_url ? (
        <img src={domain.image_url} alt={domain.domain_name} className={styles.image} />
      ) : (
        <div className={styles.placeholderImage}>No Image</div>
      )}
         </div>
        <h3 className={styles.title}>{domain.domain_name}</h3>
        <p className={styles.description}>{domain.description}</p>
      </div>
      </Link>
    );
  };

export default DomainCard;