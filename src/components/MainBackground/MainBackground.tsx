import styles from './MainBackground.module.scss';
import background from '@/assets/background.jpg';
import { AnimatePresence, motion } from 'framer-motion';

function MainBackground({ hideTexture }: { hideTexture: boolean }) {

  return (
    <div className={styles.container}>
      <img className={styles.mainBackground} src={background.src} alt='' />
      <AnimatePresence>
        {hideTexture ? null : (
          <motion.div
            className={styles.texture}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default MainBackground;
