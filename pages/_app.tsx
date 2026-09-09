import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Geist_Mono } from 'next/font/google';
import '../styles/globals.css';

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={geistMono.variable}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f3eddc" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
