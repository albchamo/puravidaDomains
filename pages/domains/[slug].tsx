// pages/domains/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import DomainDetail from '../../components/DomainDetail';
import { supabase } from '../../utils/supabase/client';
import React from 'react';
import Header from '@/components/Header';

type Domain = {
  id: number;
  domain_name: string;
  price: number;
  description: string;
  image_url: string;
};

type Props = {
  domain: Domain | null;
};

const DomainPage: React.FC<Props> = ({ domain }) => {
  return (
    <>
      <Header />
      {/* Pass the domain prop to DomainDetail */}
      <DomainDetail domain={domain} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: domains, error } = await supabase.from('domains').select('domain_name');
  
  if (error) {
    console.error('Error fetching domains:', error);
    return { paths: [], fallback: false };
  }

  const paths = domains.map((domain) => ({
    params: { slug: domain.domain_name },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;
  if (typeof slug !== 'string') {
    return { props: { domain: null } };
  }
    const { data: domains, error } = await supabase
    .from('domains')
    .select('*')
    .ilike('domain_name', slug);

 // Handle the case where the domain is not found
 if (error || !domains || domains.length === 0) {
  console.error('Error fetching domain or domain not found:', error);
  return { props: { domain: null } }; // Provide a null domain prop if not found
}

// If domain is found, return it as a prop
const domain = domains[0];
return { props: { domain } };
};

export default DomainPage;