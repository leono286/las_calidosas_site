import { TypeMenu, TypeMenuCategoryFields, TypeMenuFields } from '@/Types';
import { Entry } from 'contentful';
import FeaturedProductsSlider from '../FeaturedProductsSlider';
import CustomMarquee from '../Marquee';
import PageGradient from '../PageGradient';
import styles from './MenuPage.module.scss';
import CaretRight from '@/assets/svg/caret_right.svg';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import MenuDetailModal from '../MenuDetailModal';

function MenuPage({ menu }: { menu: Entry<TypeMenuFields> }) {
  const { categories, featuredMenuItemsSlider } = menu.fields as TypeMenuFields;

  const [showMenuDetail, setShowMenuDetail] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Entry<TypeMenuCategoryFields> | undefined
  >();

  const bodyRef = useRef<HTMLBodyElement | null>(null);

  useEffect(() => {
    bodyRef.current = document.body as HTMLBodyElement;
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
      <div className={styles.container}>
        <PageGradient />

        <div className={styles.contentWrapper}>
          <CustomMarquee text={'MENU'} />

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
                  <div className={styles.iconWrapper}>
                    <CaretRight />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
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
}

export default MenuPage;
