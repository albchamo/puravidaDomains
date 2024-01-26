/// components/DomainDetail.tsx
import React from 'react';
import styles from './DomainDetail.module.css';
import Link from 'next/link'; // Import Link from next/link


// Define the domain type to be used in both props and the component
type DomainType = {
    id: number;
    domain_name: string;
    price: number;
    description: string;
    image_url: string;
  };

  // Update the props to allow for a nullable domain
type DomainDetailProps = {
    domain: DomainType | null;
  };

  const DomainDetail: React.FC<DomainDetailProps> = ({ domain }) => {
    if (!domain) {
      return <div className={styles.notFound}>Domain not found.</div>;
    }
  
  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img src={domain.image_url} alt={domain.domain_name} className={styles.domainImage} />
        <p className={styles.description}>{domain.description}</p>
      </div>
      <div className={styles.infoSection}>
        <h2 className={styles.domainName}>{domain.domain_name}</h2>
        <div className={styles.priceSection}>
          <span className={styles.priceLabel}>Price:</span>
          <span className={styles.price}>${domain.price}</span>
        </div>
        <Link href={`http://${domain.domain_name}`} legacyBehavior>
        <a className={styles.buyNowButton} target="_blank" rel="noopener noreferrer">Buy now!</a>
      </Link>
          <div className={styles.offerSection}>
          <input type="number" placeholder="Input amount" className={styles.offerInput} />
          <button className={styles.makeOfferButton}>Make Offer!</button>
        </div>
      </div>
    </div>
  );
};

export default DomainDetail;