import Head from 'next/head'
import styles from './../styles/Home.module.scss'
import LogoSVG from './../assets/svg/logo.svg'

export default function Home() {
  return (
    <>
      <Head>
        <title>Las Calidosas Burger</title>
        <meta name='description' content='Las calidosas burger website' />
        <meta name="keywords" content="colombian fast food, colombian food, fast food, comida rápida colombiana, comida colombiana, comida rápida" />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.content}>
        <LogoSVG className={styles.logo} />
      </div>
    </>
  )
}
