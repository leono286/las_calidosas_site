import Head from 'next/head';
import styles from './../styles/Home.module.scss';
import MainBackground from '@/components/MainBackground';
import HeroSection from '@/components/HeroSection';
import MenuPage from '@/components/MenuPage';
import {
  TypeWebsite,
} from '@/Types';
import { createClient, Entry, EntryCollection } from 'contentful';
import ContactUsPage from '@/components/ContactUsPage';
import NavBar from '@/components/NavBar';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  });

  const websiteData = await client.getEntries<TypeWebsite>({
    content_type: 'website',
    include: 6,
  });


  return { props: websiteData.items[0] };
}

export default function Home(props: TypeWebsite) {

  const {menu, footer} = props.fields;
  
  return (
    <>
      <Head>
        <title>Las Calidosas Burger</title>
        <meta name='description' content='Las calidosas burger website' />
        <meta
          name='keywords'
          content='colombian fast food, colombian food, fast food, comida rápida colombiana, comida colombiana, comida rápida'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.content}>
        <MainBackground />
        <HeroSection />
        {menu ? <MenuPage menu={menu} /> : null}
        {footer ? <ContactUsPage footerData={footer} /> : null}
      </div>
      <NavBar />
    </>
  );
}
