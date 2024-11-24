import { TypeMenuCategoryFields, TypeMenuFields } from '@/Types';
import { Entry } from 'contentful';
import FeaturedProductsSlider from '../FeaturedProductsSlider';
import CustomMarquee from '../Marquee';
import PageGradient from '../PageGradient';
import styles from './MenuPage.module.scss';
import CaretRight from '@/assets/svg/caret_right.svg';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import MenuDetailModal from '../MenuDetailModal';
import { NavBarItem } from '../NavBar/NavBar';

const MenuPage = forwardRef<
  HTMLDivElement,
  {
    menu: Entry<TypeMenuFields>;
    onSlideIn: (sectionVisible: NavBarItem['label'])=>void
  }
>(({ menu, onSlideIn }, ref) => {
  const { categories, featuredMenuItemsSlider } = menu.fields as TypeMenuFields;

  const [showMenuDetail, setShowMenuDetail] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Entry<TypeMenuCategoryFields> | undefined
  >();

  const bodyRef = useRef<HTMLBodyElement>();
  const sectionRef = useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    bodyRef.current = document.body as HTMLBodyElement;

    const observerCallback = (entries:IntersectionObserverEntry[]) => {
      if(entries[0].isIntersecting) {
        onSlideIn("Menú")
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-50% 0px -50% 0px"
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if(sectionRef.current){
        observer.unobserve(sectionRef.current)
      }
    }
  }, []);

  const sliderItems =
    featuredMenuItemsSlider && featuredMenuItemsSlider.fields.items;

  const handleShowMenu = (selectedCategory: Entry<TypeMenuCategoryFields>) => {
    if (!showMenuDetail) setShowMenuDetail(true);
    setSelectedCategory(selectedCategory);
    toggleBodyOverflowScroll(false);
  };

  const handleHideMenu = () => {
    setShowMenuDetail(false);
    setSelectedCategory(undefined);
    toggleBodyOverflowScroll(true);
  };

  const toggleBodyOverflowScroll = (scroll: boolean) => {
    if (bodyRef.current) {
      bodyRef.current.style.overflow = scroll ? 'unset' : 'hidden';
    }
  };

  return (
    <>
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
          <CustomMarquee text={'MENÚ'} />

          <div className={styles.content}>
            {sliderItems?.length ? (
              <div className={styles.sliderWrapper}>
                <FeaturedProductsSlider items={sliderItems} />
              </div>
            ) : null}

            <div className={styles.categories}>
              {categories.map((category) => (
                <button
                  className={styles.categoryButton}
                  key={category.sys.id}
                  onClick={() => handleShowMenu(category)}
                >
                  <span>{category.fields.name}</span>
                  <div className={styles.caretRightWrapper}>
                    <CaretRight />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {showMenuDetail ? (
          <MenuDetailModal
            seletedCategory={selectedCategory!}
            onClose={handleHideMenu}
            categories={categories}
            onCategoryChange={(category) => setSelectedCategory(category)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
});

export default MenuPage;

MenuPage.displayName = "MenuPage";
