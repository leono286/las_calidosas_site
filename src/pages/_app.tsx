import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import localFont from '@next/font/local'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LogoGreeting from '@/components/LogoGreeting'
import Head from 'next/head'

const gothamUltra = localFont({
  src: './../assets/fonts/gotham-ultra-webfont.woff2',
  variable: '--gotham-ultra-font',
})
const gothamBold = localFont({
  src: './../assets/fonts/gotham-bold-webfont.woff2',
  variable: '--gotham-bold-font',
})
const dorchesterDisplay = localFont({
  src: './../assets/fonts/dorchesterdisplay-webfont.woff2',
  variable: '--dorchester-display-font',
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const routerQuery = router.query
  const printMode = routerQuery.hasOwnProperty('printMode')
  const [showLogo, setShowLogo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const alreadyShown = window.sessionStorage.getItem('logoShown')
    if (alreadyShown === null) {
      setShowLogo(true)
      window.sessionStorage.setItem('logoShown', 'true')
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (showLogo && !isLoading) {
      setTimeout(() => {
        setShowLogo(false)
      }, 1200)
    }
  }, [isLoading, showLogo])

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
        <meta property='og:url' content='http://lascalidosas.com' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Las Calidosas Burger' />
        <meta
          property='og:description'
          content='Sabor a calle colombiana. Comida rápida colombiana en Elizabeth NJ. Sabor a calle colombiana.'
        />
        <meta
          property='og:image'
          content='http://lascalidosas.com/hamburger.jpg'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main
        className={`${gothamBold.variable} ${gothamUltra.variable} ${dorchesterDisplay.variable}`}
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
  )
}
