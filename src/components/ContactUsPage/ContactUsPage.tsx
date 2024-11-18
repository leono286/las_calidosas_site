import { TypeFooterNewSiteFields, TypeMenu, TypeMenuFields } from '@/Types';
import { Entry } from 'contentful';
import { forwardRef, useEffect, useRef } from 'react';
import CustomMarquee from '../Marquee';
import { NavBarItem } from '../NavBar/NavBar';
import NewFooter from '../NewFooter';
import PageGradient from '../PageGradient';
import styles from './ContactUsPage.module.scss';

const ContactUsPage = forwardRef<
  HTMLDivElement,
  {
    footerData: Entry<TypeFooterNewSiteFields>;
    onSlideIn: (sectionVisible: NavBarItem['label']) => void;
  }
>(({ footerData, onSlideIn }, ref) => {
  const { locations, deliveryPlatformsList } = footerData.fields;
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        onSlideIn('Delivery');
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-50% 0px -50% 0px"
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      className={styles.container}
      ref={(node: HTMLDivElement) => {
        sectionRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
    >
      <PageGradient />

      <div className={styles.contentWrapper}>
        <CustomMarquee text={'MOR, NO TE QUEDES CON EL ANTOJO'} />

        <div className={styles.content}>
          <NewFooter
            locations={locations}
            deliveryPlatformsList={deliveryPlatformsList}
          />
        </div>
      </div>
    </section>
  );
});

export default ContactUsPage;

ContactUsPage.displayName = "ContactUsPage";
