import Head from 'next/head';
import styles from './../styles/Home.module.scss';
import MainBackground from '@/components/MainBackground';
import HeroSection from '@/components/HeroSection';
import MenuPage from '@/components/MenuPage';
import { TypeWebsite } from '@/Types';
import { createClient, Entry, EntryCollection } from 'contentful';
import ContactUsPage from '@/components/ContactUsPage';
import NavBar from '@/components/NavBar';
import { useRef, useState } from 'react';
import { NavBarItem } from '@/components/NavBar/NavBar';
import { AnimatePresence, motion } from 'framer-motion';

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
  const { menu, footer } = props.fields;
  const heroPageRef = useRef<HTMLDivElement>(null);
  const menuPageRef = useRef<HTMLDivElement>(null);
  const contactUsPageRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] =
    useState<NavBarItem['label']>('Inicio');

  const [hideContent, setHideContent] = useState(false);

  const handlNavBarItemSelected = (selectedItem: NavBarItem['label']) => {
    let targetRef = null;

    switch (selectedItem) {
      case 'Inicio':
        targetRef = heroPageRef;
        break;
      case 'Menú':
        targetRef = menuPageRef;
        break;
      case 'Delivery':
        targetRef = contactUsPageRef;
        break;

      default:
        break;
    }

    if (targetRef?.current) {
      targetRef.current.scrollIntoView();
    }
  };

  console.log(menu);

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
        {/* <button
          style={{ position: 'absolute', zIndex: 20 }}
          onClick={() => setHideContent(!hideContent)}
        >
          test
        </button> */}
        <MainBackground hideTexture={hideContent}/>
        <AnimatePresence>
          {!hideContent ? (
            <motion.div
              // initial={false}
              animate={{
                opacity: hideContent ? 0 : 1,
                y: hideContent ? '20%' : 0,
              }}
              exit={{ opacity: 0, y: '20%' }}
              transition={{duration: 0.3}}
            >
              <HeroSection ref={heroPageRef} onSlideIn={setActiveSection} />
              {menu ? (
                <MenuPage
                  menu={menu}
                  ref={menuPageRef}
                  onSlideIn={setActiveSection}
                />
              ) : null}
              {footer ? (
                <ContactUsPage
                  footerData={footer}
                  ref={contactUsPageRef}
                  onSlideIn={setActiveSection}
                />
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <NavBar
        activeSection={activeSection}
        onItemClick={handlNavBarItemSelected}
      />
    </>
  );
}
