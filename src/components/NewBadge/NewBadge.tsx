import styles from "./NewBadge.module.scss"

function NewBadge() {
  return (
    <div className={styles.badge}>
      <div className={styles.labelBox}>
        <span className={styles.label}>NEW</span>
      </div>
    </div>
  )
}

export default NewBadge
