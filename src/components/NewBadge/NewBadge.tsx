import styles from "./NewBadge.module.scss"
import RibbonSVG from '@/assets/svg/ribbon.svg'

function NewBadge() {
  return (
    <div className={styles.badge}>
      <RibbonSVG />
      <div className={styles.labelBox}>
        <span className={styles.label}>NEW</span>
      </div>
    </div>
  )
}

export default NewBadge
