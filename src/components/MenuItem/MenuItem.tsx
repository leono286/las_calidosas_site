import { TypeMenuItem } from '@/Types'
import PriceTagSVG from '@/assets/svg/white_tag.svg'
import styles from './MenuItem.module.scss'
import NewBadge from '../NewBadge'

function MenuItem({ item }: { item: TypeMenuItem & { updatePrice: string } }) {
  const { updatePrice, fields } = item
  const { name, spanishDescription, englishDescription, price, listOfItems, isNew } =
    fields

  const isListOfItems = listOfItems?.length
  const hasDescription = spanishDescription || englishDescription

  const priceUpdated = updatePrice
    ? Math.ceil(price + price * parseFloat(updatePrice))
    : price

  const priceToDisplay =
    priceUpdated < 1 ? `.${price.toString().split('.')[1]}` : priceUpdated

  return (
    <div className={`${styles.menuItem} ${isListOfItems ? 'no-wrap' : ''}`}>
      {isListOfItems ? (
        <div className={`${styles.listOfItems}`}>
          {listOfItems.map((item, index) => {
            const [label, smallLabel] = item.split('(')

            return (
              <span className='product' key={index}>
                {label.trim()}
                {smallLabel ? <small>{` (${smallLabel.trim()}`}</small> : null}
              </span>
            )
          })}
        </div>
      ) : (
        <div
          className={`${styles.menuItemName} ${
            !hasDescription ? styles.hasNoDescription : ''
          }`}
        >
            {name}
            {isNew ? <NewBadge />: null}
        </div>
      )}
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
