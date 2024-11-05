import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import localFont from '@next/font/local';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LogoGreeting from '@/components/LogoGreeting';
import Head from 'next/head';
import { Lato } from '@next/font/google';

const lato = Lato({
  weight: ['700', '400'],
  subsets: ['latin'],
  variable: '--lato-font',
  display: 'swap',
});

const helvetica = localFont({
  src: [
    { path: './../assets/fonts/Helvetica Neue Regular.woff2', weight: '400', style: 'normal' },
    { path: './../assets/fonts/Helvetica Neue Italic.woff2', weight: '400', style: 'italic' },
    { path: './../assets/fonts/Helvetica Neue Bold.woff2', weight: '700', style: 'normal' },
    { path: './../assets/fonts/Helvetica Neue Bold Italic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--helvetica-font',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const routerQuery = router.query;
  const printMode = routerQuery.hasOwnProperty('printMode');
  const [showLogo, setShowLogo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const alreadyShown = window.sessionStorage.getItem('logoShown');
    if (alreadyShown === null) {
      setShowLogo(true);
      window.sessionStorage.setItem('logoShown', 'true');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (showLogo && !isLoading) {
      setTimeout(() => {
        setShowLogo(false);
      }, 1200);
    }
  }, [isLoading, showLogo]);

  return (
    <>
      <Head>
        <title>Las Calidosas Burger</title>
        <meta name='description' content='Las calidosas burger website' />
        <meta
          name='keywords'
          content='colombian fast food, colombian food, fast food, comida rápida colombiana, comida colombiana, comida rápida,comida colombiana Elizabeth NJ'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta property='og:url' content='https://lascalidosas.com' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='Las Calidosas Burger'></meta>
        <meta property='og:title' content='Las Calidosas Burger' />
        <meta
          property='og:description'
          content='Sabor a calle colombiana. Comida rápida colombiana en Elizabeth NJ.'
        />
        <meta
          property='og:image'
          content='https://lascalidosas.com/hamburger.jpg'
        />
        <meta
          property='og:image:secure_url'
          content='https://lascalidosas.com/hamburger.jpg'
        />
        <meta property='og:image:type' content='image/jpeg' />
        <meta
          property='og:image:alt'
          content='Hamburger image with text "Sabor a calle colombiana"'
        />

        <link rel='icon' href='/images/favicon.ico' sizes='48x48' />
        <link
          rel='icon'
          href='/images/burger-logo.svg'
          sizes='any'
          type='image/svg+xml'
        />
        <link
          rel='apple-touch-icon'
          href='/images/apple-touch-icon-180x180.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#111011' />
      </Head>
      <main
        className={`${lato.variable} ${helvetica.variable}`}
      >
        <style>
          {printMode
            ? `
        :root {
          --brand-yellow: #111011;
          --white: #111011;
          --brand-background: #fff;
        }
        `
            : ''}
        </style>
        {isLoading ? null : showLogo ? (
          <LogoGreeting />
        ) : (
          <Component {...pageProps} />
        )}
      </main>
    </>
  );
}
