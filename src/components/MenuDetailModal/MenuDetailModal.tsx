import { TypeMenuCategoryFields } from '@/Types';
import { Entry } from 'contentful';
import { motion } from 'framer-motion';
import CustomMarquee from '../Marquee';
import MenuItem from '../MenuItem';
import MenuIconSVG from '@/assets/svg/forkKnifeIcon.svg';
import CaretRight from '@/assets/svg/caret_right.svg';
import styles from './MenuDetailModal.module.scss';
import BrushStrokeText from '../BrushStrokeText';
import {
  CSSProperties,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

const breakpoints = [
  { media: '(min-width: 767px)', size: 'small' },
  { media: '(min-width: 0px)', size: 'xsmall' },
];

const mediaBottomPos: { [key: string]: string } = {
  hamburguesas: '74%',
  perros: '50%',
  salchipapas: '30%',
  maicitos: '33%',
  otrasdelicias: '27%',
  kids: '24%',
};

const mediaLeftPos: { [key: string]: string } = {
  kids: '40%',
};

function MenuDetailModal({
  selectedCategory,
  categories,
  onClose,
  onCategoryChange,
}: {
  selectedCategory: Entry<TypeMenuCategoryFields>;
  categories: Entry<TypeMenuCategoryFields>[];
  onClose: () => void;
  onCategoryChange: (selectedCategory: Entry<TypeMenuCategoryFields>) => void;
}) {
  const contentDivRef = useRef<HTMLDivElement>(null);

  const localNavRef = useRef<HTMLDivElement>(null);

  const selectedCategoryName = selectedCategory.fields.name;

  const [showFeaturedSection, setShowFeaturedSection] = useState(false);

  const isSpecialCategory = ['adiciones', 'bebidas'].includes(
    selectedCategoryName.toLowerCase(),
  );

  const titleImgName = selectedCategoryName.toLowerCase().replace(/ /g, '');

  const featuredVideoUrl =
    selectedCategory.fields.videoShowcase?.fields.file.url;
  const featuredPictureUrl =
    selectedCategory.fields.pictureSlider?.fields.items?.[0].fields.image.fields
      .file.url;

  useEffect(() => {
    history.pushState(null, '', document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, '', document.URL);
      setTimeout(() => {
        onClose();
      }, 100);
    });
  }, []);

  const onAnimationCompleteHandler = (e: { x: number | string }) => {
    if (e.x === 0 && localNavRef.current) {
      const activeElement = localNavRef.current.querySelector(
        `.${styles.active}`,
      );
      const activeElementRect = activeElement!.getBoundingClientRect();
      const hiddenPixelsCount =
        activeElementRect.left + activeElementRect.width - window.innerWidth;

      if (hiddenPixelsCount > 0) {
        localNavRef.current.scroll({
          left: hiddenPixelsCount + 40,
          behavior: 'auto',
        });
      }
    }
  };

  useEffect(() => {
    if (contentDivRef.current && contentDivRef.current.scrollTop > 0) {
      setTimeout(() => {
        contentDivRef.current!.scrollTop = 0;
      }, 10);
    }

    setShowFeaturedSection(false);

    setTimeout(() => {
      if (!showFeaturedSection) {
        setShowFeaturedSection(true);
      }
    }, 800);
  }, [selectedCategory]);

  const playVideoHandler = (
    e: SyntheticEvent<HTMLVideoElement, Event>,
    delayPlay = false,
  ) => {
    const videoElement = e.target as HTMLVideoElement;
    setTimeout(
      () => {
        videoElement.play();
        setShowFeaturedSection(true);
      },
      delayPlay ? 300 : 0,
    );
  };

  return (
    <motion.div
      className={`${styles.menuDetailContainer} ${
        isSpecialCategory ? styles.lightBg : ''
      }`}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{
        x: { type: 'spring', bounce: 0, duration: 0.56 },
        ease: 'easeOut',
      }}
      onAnimationComplete={onAnimationCompleteHandler}
    >
      <div className={styles.texture} />
      <CustomMarquee text={selectedCategoryName.toUpperCase()} />
      <div className={styles.localNavContainer} ref={localNavRef}>
        <div className={styles.localNav}>
          {categories.map((category) => (
            <button
              key={category.sys.id}
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
      <div className={styles.content} ref={contentDivRef}>
        <div
          className={`${styles.title} ${
            !isSpecialCategory ? styles.noMarginMedium : null
          }`}
        >
          {isSpecialCategory ? (
            <BrushStrokeText
              text={selectedCategoryName.toUpperCase()}
              color='black'
              elementSize='large'
            />
          ) : (
            <picture>
              {breakpoints.map(({ media, size }) => (
                <source
                  key={size}
                  media={media}
                  srcSet={`/images/categoryTitles/${size}/${titleImgName}.png`}
                />
              ))}
              <img
                src={`/images/categoryTitles/xsmall/${titleImgName}.png`}
                alt={`categoría ${selectedCategoryName}`}
                className='hide-on-medium'
              />
            </picture>
          )}
        </div>

        <div
          className={`${styles.contentWrapper} ${
            !isSpecialCategory ? styles.requiredHeight : null
          }`}
        >
          {featuredPictureUrl || featuredVideoUrl ? (
            <motion.div
              animate={{ opacity: showFeaturedSection ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className={`${styles.featured} ${
                featuredVideoUrl ? styles.isVideo : null
              } ${featuredPictureUrl ? styles.isImage : null}`}
              style={
                {
                  '--customBottomPos': mediaBottomPos[titleImgName] ?? '84%',
                  '--customLeftPos': mediaLeftPos[titleImgName] ?? '18%',
                } as CSSProperties
              }
            >
              {featuredVideoUrl ? (
                <video
                  src={featuredVideoUrl}
                  onCanPlay={playVideoHandler}
                  onLoadedMetadata={(e) => playVideoHandler(e, true)}
                  controls={false}
                  loop={true}
                  muted
                  playsInline
                />
              ) : featuredPictureUrl ? (
                <img
                  src={featuredPictureUrl}
                  onLoad={() => setShowFeaturedSection(true)}
                  onLoadedMetadata={() => setShowFeaturedSection(true)}
                />
              ) : null}
            </motion.div>
          ) : null}

          <div className={styles.itemsList}>
            {!isSpecialCategory ? (
              <img
                src={`/images/categoryTitles/small/${titleImgName}.png`}
                alt={`categoría ${selectedCategoryName}`}
                className={`hide-on-xsmall show-on-medium ${styles.titleInColumn}`}
              />
            ) : null}

            {selectedCategory.fields.products.map((product) => (
              <MenuItem
                key={product.sys.id}
                item={{ ...product, darkText: isSpecialCategory }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.buttonGradient}>
        <button
          className={styles.backButton}
          onClick={() => {
            setTimeout(() => {
              onClose();
            }, 100);
          }}
        >
          <div className={styles.caretLeftWrapper}>
            <CaretRight className={styles.caret} />
          </div>
          <div className={styles.buttonContent}>
            <MenuIconSVG />
            <span>Menú</span>
          </div>
        </button>
      </div>
    </motion.div>
  );
}

export default MenuDetailModal;
