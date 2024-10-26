import Marquee from 'react-fast-marquee';
import styles from './CustomMarquee.module.scss';

function CustomMarquee({ text }: { text: string | string[] }) {
  const textArray = Array.isArray(text) ? text : [text];

  return (
    <div className={styles.container}>
      <Marquee speed={16} autoFill={true}>
        {textArray.map((textItem, index) => (
          <div className={styles.item} key={index}>
            <div key={index} className={styles.text}>
              {textItem}
            </div>
            <div className={styles.divider}></div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default CustomMarquee;

