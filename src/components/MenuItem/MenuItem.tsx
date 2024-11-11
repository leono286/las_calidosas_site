import { TypeMenuItem } from '@/Types';
import PriceTagSVG from '@/assets/svg/white_tag.svg';
import styles from './MenuItem.module.scss';
import NewBadge from '../NewBadge';

function MenuItem({ item }: { item: TypeMenuItem & { updatePrice?: string, darkText?: boolean } }) {
  const { updatePrice, darkText, fields } = item;
  const {
    name,
    spanishDescription,
    englishDescription,
    price,
    listOfItems,
    isNew,
  } = fields;

  const isListOfItems = listOfItems?.length;

  const priceUpdated = updatePrice
    ? Math.ceil(price + price * parseFloat(updatePrice))
    : price;

  const priceToDisplay =
    priceUpdated < 1 ? `.${price.toString().split('.')[1]}` : priceUpdated;

  return (
    <section
      className={`${styles.menuItem} ${isListOfItems ? 'list-of-items' : ''} ${darkText ? styles.darkText : ''}`}
    >
      {isListOfItems ? (
        <>
          {/* <div className={`${styles.listOfItems}`}>
          {listOfItems.map((item, index) => {
            const [label, smallLabel] = item.split('(');

            return (
              <span className='product' key={index}>
                {label.trim()}
                {smallLabel ? <small>{` (${smallLabel.trim()}`}</small> : null}
              </span>
            );
          })}
        </div> */}
        </>
      ) : (
        <div className={styles.firstRow}>
          <div className={`${styles.menuItemName}`}>
            {name}
            {isNew ? <NewBadge /> : null}
          </div>
          <div className={`${styles.menuItemPrice} hide-on-medium`}>
            <PriceTagSVG />
            <span>${priceToDisplay}</span>
          </div>
        </div>
      )}
      <div className={styles.secondRow}>
        {spanishDescription || englishDescription ? (
          <div className={styles.menuItemDescription}>
            {spanishDescription ? (
              <p className={styles.spanish}>{spanishDescription}</p>
            ) : null}
            {englishDescription ? (
              <p className={styles.english}>{englishDescription}</p>
            ) : null}
          </div>
        ) : null}
        <div
          className={`${styles.menuItemPrice} hide-on-xsmall show-on-medium`}
        >
          <PriceTagSVG />
          <span>${priceToDisplay}</span>
        </div>
      </div>
    </section>
  );
}

export default MenuItem;
