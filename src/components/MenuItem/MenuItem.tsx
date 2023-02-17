import { TypeMenuItem } from '@/Types'
import PriceTagSVG from '@/assets/svg/white_tag.svg'
import styles from "./MenuItem.module.scss";

function MenuItem({ item }: { item: TypeMenuItem }) {
  const { name, spanishDescription, englishDescription, price } = item.fields

  return (
    <div className={styles.menuItem}>
      <div className={styles.menuItemName}>{name}</div>
      <div className={styles.menuItemPrice}>
        <PriceTagSVG />
        <span>${price}</span>
      </div>
      <div className={styles.menuItemDescription}>
        <p className='spanish-description'>{spanishDescription}</p>
        {englishDescription && (
          <p className='english-description'>{englishDescription}</p>
        )}
      </div>
    </div>
  )
}

export default MenuItem
