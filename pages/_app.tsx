// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Adjust the path to your global stylesheet

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
