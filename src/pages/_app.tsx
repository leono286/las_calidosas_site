import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import localFont from '@next/font/local'
import { useRouter } from 'next/router'

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
  const printMode = router.query.hasOwnProperty('printMode')
  
  return (
    <main
      className={`${gothamBold.variable} ${gothamUltra.variable} ${dorchesterDisplay.variable}`}
    >
      <style>
        {printMode ? `
        :root {
          --brand-yellow: #111011;
          --white: #111011;
          --brand-background: #fff;
        }
        `: ''}
      </style>
      <Component {...pageProps} />
    </main>
  )
}
