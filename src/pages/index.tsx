import Head from 'next/head';
import styles from './../styles/Home.module.scss';
import MainBackground from '@/components/MainBackground';
import HeroSection from '@/components/HeroSection';
import MenuPage from '@/components/MenuPage';
import { TypeWebsite } from '@/Types';
import { createClient, Entry, EntryCollection } from 'contentful';
import ContactUsPage from '@/components/ContactUsPage';
import NavBar from '@/components/NavBar';
import { useEffect, useRef, useState } from 'react';
import { NavBarItem } from '@/components/NavBar/NavBar';
import { AnimatePresence, motion } from 'framer-motion';

import background from '@/assets/background.jpg';
import yellowBrushStroke from '@/assets/yellow-brush-stroke.png';
import lasCalidosasLogo from '@/assets/logo-las-calidosas.png';
import texture from '@/assets/textura.png';
import useImagePreloader from '@/hooks/useImagePreloader';
import LogoGreeting from '@/components/LogoGreeting';

const preloadSrcList: string[] = [
  yellowBrushStroke.src,
  lasCalidosasLogo.src,
  texture.src,
  background.src,
];

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
  const { imagesPreloaded } = useImagePreloader(preloadSrcList);
  const { menu, footer } = props.fields;
  const heroPageRef = useRef<HTMLDivElement>(null);
  const menuPageRef = useRef<HTMLDivElement>(null);
  const contactUsPageRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] =
    useState<NavBarItem['label']>('Inicio');

  const [showBackground, setShowBackground] = useState(false);
  const [hideLogo, setHideLogo] = useState(false);
  const [hideContent, setHideContent] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowBackground(true);
    }, 200);
    setTimeout(() => {
      setHideLogo(true);
      setHideContent(false);
    }, 1500);
  }, [imagesPreloaded]);

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
        <motion.div
          initial={{ scale: 0.05, y: '50vh' }}
          animate={{
            scale: showBackground ? 1 : 0.05,
            y: showBackground ? 0 : '50vh',
          }}
          transition={{
            type: 'spring',
            bounce: showBackground ? 0.48 : 0,
            duration: showBackground ? 0.8 : 0.5,
          }}
          style={{ transformOrigin: 'center center' }}
        >
          <MainBackground hideTexture={hideContent} />
        </motion.div>
        <AnimatePresence>
          {hideLogo ? null : (
            <motion.div
              initial={false}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'fixed',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <LogoGreeting />
            </motion.div>
          )}
        </AnimatePresence>
        {!hideContent ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: hideContent ? 0 : 1,
              y: hideContent ? '20%' : 0,
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: hideContent ? 0 : 1,
          y: hideContent ? '20%' : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <NavBar
          activeSection={activeSection}
          onItemClick={handlNavBarItemSelected}
        />
      </motion.div>
    </>
  );
}
