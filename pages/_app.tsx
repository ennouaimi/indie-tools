import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Gabarito, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';

const gabarito = Gabarito({
  subsets: ['latin'],
  variable: '--font-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${gabarito.variable} ${geistMono.variable}`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0d0d0f" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
