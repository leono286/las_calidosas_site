import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import styles from './CustomMarquee.module.scss';

function CustomMarquee({ text }: { text: string | string[] }) {
  const textArray = Array.isArray(text) ? text : [text];

  const [textToShow, setTextToShow] = useState(textArray);

  const [enableFadeOnChange, setEnableFadeOnChange] = useState(false);
  const [hideMarquee, setHideMarquee] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (enableFadeOnChange) {
      setHideMarquee(true);
      timeoutId = setTimeout(() => {
        setTextToShow(textArray);
        setHideMarquee(false);
      }, 260);
    } else {
      setTextToShow(textArray);
    }

    return () => timeoutId && clearTimeout(timeoutId);
  }, [text]);

  useLayoutEffect(() => {
    setEnableFadeOnChange(true);
  }, []);

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {!hideMarquee ? (
          <motion.div
            animate={{ opacity: 1 }}
            initial={enableFadeOnChange ? { opacity: 0 } : false}
            exit={{ opacity: 0 }}
          >
            <Marquee speed={16} autoFill={true}>
              {textToShow.map((textItem, index) => (
                <div className={styles.item} key={index}>
                  <div key={index} className={styles.text}>
                    {textItem}
                  </div>
                  <div className={styles.divider}></div>
                </div>
              ))}
            </Marquee>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default CustomMarquee;
