import lasCalidosasLogo from '@/assets/logo-las-calidosas.png';
import BrushStrokeText from '../BrushStrokeText';
import styles from './HeroSection.module.scss';
import InstagramSVG from '@/assets/svg/instagram.svg';
import FacebookSVG from '@/assets/svg/facebook.svg';
import PageGradient from '../PageGradient';
import { forwardRef, Ref, useEffect, useRef } from 'react';
import { NavBarItem } from '../NavBar/NavBar';

const HeroSection = forwardRef<
  HTMLDivElement,
  { onSlideIn: (sectionVisible: NavBarItem['label']) => void }
>(({ onSlideIn }, ref) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        onSlideIn('Inicio');
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
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
      <img className={styles.logo} src={lasCalidosasLogo.src} alt='' />

      <div className={styles.content}>
        <BrushStrokeText
          className='hide-on-xsmall show-on-large'
          text='SABOR A'
          elementSize='large'
        />
        <BrushStrokeText
          className='hide-on-large'
          text='SABOR'
          elementSize='large'
        />
        <BrushStrokeText
          className='hide-on-xsmall show-on-large'
          text='CALLE'
          elementSize='large'
        />
        <BrushStrokeText
          className='hide-on-large'
          text='A CALLE'
          elementSize='large'
        />
        <BrushStrokeText text='COLOMBIANA' elementSize='large' />

        <div className={styles.instructions}>
          <p>
            Qué más pues!
            <br />
            Bien o qué?
          </p>
          <p>
            Te <span>esperamos</span> en el counter para tomar tu{' '}
            <span>pedido.</span>
          </p>
        </div>

        <div className={styles.socialNetworks}>
          <a
            href='https://www.instagram.com/lascalidosasburger/'
            target='_blank'
            rel='noreferrer'
          >
            <InstagramSVG />
          </a>
          <a
            href='https://www.facebook.com/profile.php?id=100081292250093'
            target='_blank'
            rel='noreferrer'
          >
            <FacebookSVG />
          </a>
        </div>
      </div>
      <div className={styles.blendOut}></div>
    </section>
  );
});

export default HeroSection;

HeroSection.displayName = "HeroSection";
