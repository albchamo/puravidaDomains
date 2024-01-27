// pages/domains/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import DomainDetail from '../../components/DomainDetail';
import SmallDomainsGrid from '../../components/SmallDomainsGrid';
import Header from '@/components/Header';
import { supabase } from '../../utils/supabase/client';
import React from 'react';

type Domain = {
  id: number;
  domain_name: string;
  meta_description: string;
  title: string;
  price: number;
  description: string;
  image_url: string;
};

type Props = {
  domain: Domain | null;
  additionalDomains: Domain[];
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
    return { props: { domain: null, additionalDomains: [] } };
  }

  const { data: domainData, error } = await supabase
    .from('domains')
    .select('*')
    .eq('domain_name', slug)
    .single();

  if (error || !domainData) {
    console.error('Error fetching domain:', error);
    return { props: { domain: null, additionalDomains: [] } };
  }

  const { data: allDomains } = await supabase.from('domains').select('domain_name');

    // Check if allDomains is null
    if (!allDomains) {
      return { props: { domain: domainData, additionalDomains: [] } };
    }
  
  const otherDomains = allDomains.filter(d => d.domain_name !== slug);
  const randomDomains = [];
  for (let i = 0; i < 4 && otherDomains.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * otherDomains.length);
    randomDomains.push(otherDomains.splice(randomIndex, 1)[0]);
  }

  const additionalDomains = await Promise.all(randomDomains.map(async (d) => {
    const { data } = await supabase
      .from('domains')
      .select('*')
      .eq('domain_name', d.domain_name)
      .single();
    return data;
  }));

  return {
    props: {
      domain: domainData,
      additionalDomains: additionalDomains || []
    }
  };
};

const DomainPage: React.FC<Props> = ({ domain, additionalDomains }) => {
  return (
    <>
      <Header />
      <DomainDetail domain={domain} />
      <SmallDomainsGrid domains={additionalDomains} />
    </>
  );
};

export default DomainPage;
