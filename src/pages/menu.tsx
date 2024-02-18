import MenuItem from '@/components/MenuItem';
import { mapCategoryToSVG, toCapitalFirstLetter, toLowerCase } from '@/helpers';
import { TypeFooter, TypeMenu, TypeMenuCategory } from '@/Types';
import { createClient } from 'contentful';
import styles from './../styles/Menu.module.scss';
import LogoSVG from './../assets/svg/logo.svg';
import ScrollSpy from 'react-scrollspy';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  });

  const menuResponse = await client.getEntries<TypeMenu>({
    content_type: 'menu',
    include: 3,
  });

  //@ts-ignore
  const categories = menuResponse.items[0].fields.categories;

  const footerResponse = await client.getEntries<TypeFooter>({
    content_type: 'footer',
    include: 3,
  });

  const footerProps = footerResponse.items[0];

  return {
    props: { categories, footerProps },
  };
}

const scrollspyOffset = -200;

export default function Menu({
  categories,
  footerProps,
}: {
  categories: TypeMenuCategory[];
  footerProps: TypeFooter;
}) {
  const [isMenuScroll, setIsMenuScroll] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const PWAHandlerFlag = useRef(false);

  const router = useRouter();
  const updatePrice = router.query.updatePrice as string;
  const printMode = router.query.hasOwnProperty('printMode');

  useEffect(() => {
    const isPWAStandalone = window.matchMedia(
      '(display-mode: standalone)',
    ).matches;

    if (isPWAStandalone && !PWAHandlerFlag.current) {
      history.pushState(null, '', location.href); // Push new history entry to stack
      history.back(); // Back to pevious page
      history.forward(); // Forward to next page
      window.addEventListener('popstate', () => {
        history.go(1);
      });
      PWAHandlerFlag.current = true;
    }
  }, []);

  useLayoutEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isMenuScroll) {
      setTimeout(() => {
        setIsMenuScroll(false);
      }, 600);
    }
  }, [isMenuScroll]);

  const categoriesNames = categories.map((category) => {
    let name = toLowerCase(category.fields.name);
    if (name.includes(' ')) {
      name = name.split(' ')[0];
    }

    return name;
  });

  const handleNavClick = (e: React.SyntheticEvent<HTMLElement>) => {
    const targetId = (e.target as HTMLElement).dataset['target'];

    setIsMenuScroll(true);
    targetId && scrollToTarget(targetId);
    targetId && scrollToCenterNavItem(targetId);
  };

  const scrollToTarget = (targetId: string) => {
    const targetSection = targetId && document.getElementById(targetId);

    if (targetSection) {
      const y =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset +
        scrollspyOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  function sideScroll(
    element: Element,
    direction: 'left' | 'right',
    distance: number,
    duration: number,
  ) {
    let scrollAmount = 0;
    const step = 2;
    const speed = duration / (distance / step);

    let slideTimer = setInterval(function () {
      if (direction == 'left') {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  }

  const scrollToCenterNavItem = (targetValue: string) => {
    const targetItem = document
      .querySelector('.scrollspy')
      ?.querySelector(`[data-target=${targetValue}]`);

    const parentItem = targetItem?.parentElement;

    if (!parentItem || parentItem?.scrollWidth - parentItem?.offsetWidth < 12)
      return;

    const mainContainerWidth = document
      .querySelector('main')
      ?.getBoundingClientRect().width;

    const targetRect = targetItem?.getBoundingClientRect();
    if (targetItem && targetRect && mainContainerWidth && parentItem) {
      const distance =
        targetRect.left + targetRect.width / 2 - mainContainerWidth / 2;
      const direction = distance < 0 ? 'left' : 'right';
      sideScroll(parentItem, direction, Math.abs(distance), 80);
    }
  };

  const onScrollspyUpdate = (e: HTMLElement) => {
    if (isMenuScroll || !e) return;
    const dataTargetValue = e.id;
    dataTargetValue && scrollToCenterNavItem(dataTargetValue);
  };

  return (
    <div className={`${styles.wrapper}${isVisible ? ' is-visible' : ''}`}>
      <div className={styles.title}>
        <LogoSVG className={styles.logo} />
        <span>Menú</span>
        <div className={styles.separator} role='presentation' />
      </div>
      {printMode ? null : (
        <ScrollSpy
          items={categoriesNames}
          componentTag='div'
          currentClassName={styles.current}
          className={styles.scrollspy + ' scrollspy'}
          offset={scrollspyOffset}
          onUpdate={onScrollspyUpdate}
        >
          {categoriesNames.map((categoryName) => (
            <button
              key={categoryName}
              className={styles.navItem}
              data-target={categoryName}
              onClick={handleNavClick}
            >
              {toCapitalFirstLetter(categoryName)}
            </button>
          ))}
        </ScrollSpy>
      )}
      <div className={styles.content}>
        {categories.map((category, index) => {
          const TitleSVG = mapCategoryToSVG(category.fields.name);
          const isLastCategory = index === categories.length - 1;

          return (
            <section
              className={styles.menuCategory}
              key={category.sys.id}
              id={categoriesNames[index]}
            >
              <h3
                className={`${styles.menuCategoryName}${
                  !TitleSVG || printMode ? ' text' : ''
                }`}
              >
                {TitleSVG && !printMode ? (
                  <TitleSVG />
                ) : (
                  <>
                    {category.fields.name}{' '}
                    {category.fields.englishName ? (
                      <small>({category.fields.englishName})</small>
                    ) : null}
                  </>
                )}
              </h3>
              {category.fields.products.map((product) => {
                return (
                  <MenuItem
                    key={product.sys.id}
                    item={{ ...product, updatePrice }}
                  />
                );
              })}
              {!isLastCategory && (
                <div className={styles.separator} role='presentation' />
              )}
            </section>
          );
        })}
      </div>
      {printMode ? null : <Footer {...footerProps} />}
    </div>
  );
}
