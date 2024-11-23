import styles from './MainBackground.module.scss';
import background from '@/assets/background.jpg';

import { motion } from 'framer-motion';
import Image from 'next/image';
import useImagePreloader from '@/hooks/useImagePreloader';
import { useEffect } from 'react';


function MainBackground({ hideTexture }: { hideTexture: boolean }) {

  return (
    <motion.div
      className={styles.container}
    >
      <Image
        className={styles.mainBackground}
        src={background.src}
        alt=''
        width={0}
        height={0}
        sizes='100vw'
        onLoad={() => {
          console.log('ready');
        }}
      />
      {hideTexture ? null : (
        <motion.div
          className={styles.texture}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}

export default MainBackground;
