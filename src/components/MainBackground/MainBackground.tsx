import styles from './MainBackground.module.scss';
import background from '@/assets/background.jpg';


function MainBackground() {

  return (
    <div className={styles.container}>
      <img className={styles.mainBackground} src={background.src} alt="" />
      <div className={styles.texture} />
      <div className={styles.gradient} />
    </div>
  );
}

export default MainBackground;
