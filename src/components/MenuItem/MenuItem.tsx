import { TypeMenuItem } from '@/Types'
import PriceTagSVG from '@/assets/svg/white_tag.svg'
import styles from './MenuItem.module.scss'

function MenuItem({ item }: { item: TypeMenuItem & { updatePrice: string } }) {
  const { name, spanishDescription, englishDescription, price } = item.fields
  const { updatePrice } = item;


  const hasDescription = spanishDescription || englishDescription

  const priceUpdated = updatePrice
    ? Math.ceil(price + price * parseFloat(updatePrice))
    : price
   
  const priceToDisplay =
    priceUpdated < 1 ? `.${price.toString().split('.')[1]}` : priceUpdated
  
  return (
    <div className={styles.menuItem}>
      <div
        className={`${styles.menuItemName} ${
          !hasDescription ? styles.hasNoDescription : ''
        }`}
      >
        {name}
      </div>
      <div className={styles.menuItemPrice}>
        <PriceTagSVG />
        <span>${priceToDisplay}</span>
      </div>
      {hasDescription && (
        <div className={styles.menuItemDescription}>
          <p className='spanish-description'>{spanishDescription}</p>
          {englishDescription && (
            <p className='english-description'>{englishDescription}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default MenuItem
