// pages/index.tsx
import { GetStaticProps } from 'next';
import { Domain } from '../utils/types';
import { supabase } from '../utils/supabase/client';
import React, { useState } from 'react';
import Header from '../components/Header';
import SubtitleSection from '../components/SubtitleSection';
import DomainsGrid from '../components/DomainsGrid';
import styles from '../styles/Home.module.css';
import SearchBar from '../components/SearchBar';



export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await supabase.from('domains').select('*');


  if (error) {
    console.error('Error fetching domains:', error);
    return { props: { domains: [] } };
  }

  // If image_url can be null, ensure the rest of your application logic handles it correctly
  const domains = data || [];

  return { props: { domains } };
};

interface Props {
  domains: Domain[];
}

const HomePage: React.FC<Props> = ({ domains }) => {
  const [filteredDomains, setFilteredDomains] = useState(domains);

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = domains.filter(domain =>
      domain.meta_description.toLowerCase().includes(lowercasedQuery) ||
      domain.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredDomains(filtered);
  };

  return (
    <>
      <Header />
      <SubtitleSection />
      <SearchBar onSearch={handleSearch} />
      <DomainsGrid domains={filteredDomains} />
    </>
  );
};

export default HomePage;