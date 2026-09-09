import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import '../styles/branding.css';

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

function replaceBrandText(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (node.nodeValue?.includes('IndieKit')) {
      node.nodeValue = node.nodeValue.replaceAll('IndieKit', 'indieTools');
    }
    node = walker.nextNode();
  }
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    replaceBrandText(document.body);
    if (document.title.includes('IndieKit')) {
      document.title = document.title.replaceAll('IndieKit', 'indieTools');
    }

    const bodyObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => replaceBrandText(node));
      }
    });

    const headObserver = new MutationObserver(() => {
      if (document.title.includes('IndieKit')) {
        document.title = document.title.replaceAll('IndieKit', 'indieTools');
      }
    });

    bodyObserver.observe(document.body, { childList: true, subtree: true });
    headObserver.observe(document.head, { childList: true, subtree: true, characterData: true });

    return () => {
      bodyObserver.disconnect();
      headObserver.disconnect();
    };
  }, []);

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
