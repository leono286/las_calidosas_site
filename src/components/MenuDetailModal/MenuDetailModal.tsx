import { TypeMenuCategoryFields } from '@/Types';
import { Entry } from 'contentful';
import { motion } from 'framer-motion';
import CustomMarquee from '../Marquee';
import styles from './MenuDetailModal.module.scss';

function MenuDetailModal({
  seletedCategory,
  categories,
  onClose,
  onCategoryChange,
}: {
  seletedCategory: Entry<TypeMenuCategoryFields>;
  categories: Entry<TypeMenuCategoryFields>[];
  onClose: () => void;
  onCategoryChange: (selectedCategory: Entry<TypeMenuCategoryFields>) => void;
}) {
  const selectedCategoryName = seletedCategory.fields.name;

  return (
    <motion.div
      className={styles.menuDetailContainer}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{
        x: { type: 'spring', bounce: 0, duration: 0.56 },
        ease: 'easeOut',
      }}
    >
      <div className={styles.texture} />
      <CustomMarquee text={selectedCategoryName.toUpperCase()} />
      <div className={styles.localNavContainer}>
        <div className={styles.localNav}>
          {categories.map((category) => (
            <button
              className={
                category.fields.name === selectedCategoryName
                  ? styles.active
                  : undefined
              }
              onClick={() => onCategoryChange(category)}
            >
              {category.fields.name}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <button onClick={onClose} style={{ position: 'relative' }}>
          temporal close
        </button>
      </div>
    </motion.div>
  );
}

export default MenuDetailModal;
