// pages/index.tsx
import { GetStaticProps } from 'next';
import { Domain } from '../utils/types';
import { supabase } from '../utils/supabase/client';
import React from 'react';
import Header from '../components/Header';
import SubtitleSection from '../components/SubtitleSection';
import DomainsGrid from '../components/DomainsGrid';
import styles from '../styles/Home.module.css';



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
  console.log('Domains:', domains); // Check the passed domains data

  return (
    <>
      <Header />
      <SubtitleSection />
      <DomainsGrid domains={domains} />
    </>
  );
};

export default HomePage;
