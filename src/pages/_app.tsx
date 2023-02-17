import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import localFont from '@next/font/local'

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
  return (
    <main
      className={`${gothamBold.variable} ${gothamUltra.variable} ${dorchesterDisplay.variable}`}
    >
      <Component {...pageProps} />
    </main>
  )
}
