import styles from "./NewBadge.module.scss"
import RibbonSVG from '@/assets/svg/ribbon.svg'

function NewBadge() {
  return (
    <div className={styles.badge}>
      <RibbonSVG />
      <div className={styles.labelBox}>
        <span className={styles.star}>★</span>
        <span className={styles.label}>NEW</span>
        <span className={styles.star}>★</span>
      </div>
    </div>
  )
}

export default NewBadge
