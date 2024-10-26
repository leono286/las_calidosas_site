import Head from 'next/head';
import styles from './../styles/Home.module.scss';
import MainBackground from '@/components/MainBackground';
import HeroSection from '@/components/HeroSection';
import MenuPage from '@/components/MenuPage';
import { TypeMenu, TypeFooter, TypeMenuCategory, TypeMenuFields, TypeMenuCategoryFields, TypePicturesSliderFields } from '@/Types';
import { createClient, Entry, EntryCollection } from 'contentful';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  });

  const menuResponse = await client.getEntries<TypeMenu>({
    content_type: 'menu',
    include: 3,
  });



  const menu = menuResponse.items[0];

  const footerResponse = await client.getEntries<TypeFooter>({
    content_type: 'footer',
    include: 3,
  });

  const footerProps = footerResponse.items[0] as TypeFooter;

  return {
    props: { menu, footerProps },
  };
}

export default function Home({
  menu,
  footerProps,
}: {
  // featuredMenuItemsSlider: Entry<TypePicturesSliderFields>;
  // categories: Entry<TypeMenuCategoryFields>[];
  menu: Entry<TypeMenu>
  footerProps: TypeFooter;
}) {

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
        <MenuPage menu={menu} />
      </div>
    </>
  );
}
