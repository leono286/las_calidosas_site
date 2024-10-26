import { TypeMenu, TypeMenuFields } from '@/Types';
import { Entry } from 'contentful';
import FeaturedProductsSlider from '../FeaturedProductsSlider';
import CustomMarquee from '../Marquee';
import PageGradient from '../PageGradient';
import styles from './MenuPage.module.scss';
import CaretRight from '@/assets/svg/caret_right.svg';

function MenuPage({ menu }: { menu: Entry<TypeMenu> }) {
  //@ts-ignore
  const { categories, featuredMenuItemsSlider } = menu.fields as TypeMenuFields;

  const sliderItems =
    featuredMenuItemsSlider && featuredMenuItemsSlider.fields.items;

  return (
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
            {categories.map((category) => {
              return (
                <button className={styles.categoryButton}>
                  <span>{category.fields.name}</span>
                  <div className={styles.iconWrapper}>
                    <CaretRight />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
