import styles from "./LogoGreeting.module.scss"
import Logo from '@/assets/svg/hamburger_logo.svg'

function LogoGreeting() {
  return (
    <div className={styles.wrapper}>
      <Logo />
    </div>
  )
}

export default LogoGreeting;
