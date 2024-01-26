// components/Header.tsx
import React from 'react';
import Link from 'next/link'; // Import Link from next/link
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link href="/" passHref> {/* Use Link to wrap the title */}
        <h1 className={styles.logo}>PuraVida.Domains</h1>
      </Link>
    </header>
  );
};

export default Header;
