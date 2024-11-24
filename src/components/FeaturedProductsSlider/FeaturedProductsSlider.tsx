import { TypePictureSliderItemFields } from '@/Types';
import { Entry } from 'contentful';
import styles from './FeaturedProductsSlider.module.scss';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { CSSProperties, useEffect, useState } from 'react';

function FeaturedProductsSlider({
  items,
}: {
  items: Entry<TypePictureSliderItemFields>[];
}) {
  const [opacities, setOpacities] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      // selector: '.keen__slide',
      slides: items.length,
      loop: true,
      detailsChanged(s) {
        const new_opacities = s.track.details.slides.map((slide) => {
          if (slide.portion > 0.5 && activeIndex !== slide.abs) {
            setActiveIndex(s.track.details.rel);
          }
          return slide.portion;
        });
        setOpacities(new_opacities);
      },
    },
    [
      // add plugins here
    ],
  );
  const [slideDirections, setSlideDirections] = useState<number[][]>([]);

  const getRandomDirection = () => (Math.random() >= 0.5 ? 1 : -1);

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef?.current?.next();
    }, 8000);

    if (!slideDirections.length) {
      const slideDirections = items.map(() => [
        getRandomDirection(),
        getRandomDirection(),
      ]);

      setSlideDirections(slideDirections);
    }

    return () => {
      clearInterval(interval);
    };
  }, [instanceRef, opacities]);

  return slideDirections.length ? (
    <div ref={sliderRef} className={styles.slider}>
      {items.map((item, index) => {
        const imgSrc = item.fields.image.fields.file.url;

        return (
          <div
            className={`${styles.slideWrapper} ${
              activeIndex === index ? styles.active : ''
            }`}
            key={item.sys.id}
            style={
              {
                opacity: opacities[index],
                '--x-direction': slideDirections[index][0],
                '--y-direction': slideDirections[index][1],
              } as CSSProperties
            }
          >
            <div className={styles.slide}>
              <img src={`https:${imgSrc}`} alt='' />
            </div>
            <div className={styles.scrim} />
            <div className={styles.leyend}>
              <p className={styles.description}>{item.fields.description}</p>
              <p className={styles.name}>{item.fields.name}</p>
            </div>
          </div>
        );
      })}

      <>
        <Arrow
          left
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.prev()
          }
        />

        <Arrow
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.next()
          }
        />
      </>

      <div className={styles.dots}>
        {items.map((_, idx) => {
          return (
            <button
              key={idx}
              onClick={() => {
                instanceRef.current?.moveToIdx(idx);
              }}
              className={`${styles.dot} ${
                activeIndex === idx ? styles.active : ''
              }`}
            ></button>
          );
        })}
      </div>
    </div>
  ) : null;
}

export default FeaturedProductsSlider;

function Arrow(props: {
  left?: boolean;
  onClick: (e: any) => void;
}) {
  return (
    <div className={`${styles.arrowWrapper} ${
        props.left ? styles.arrowLeft : styles.arrowRight
      }`}>
    <svg
      onClick={props.onClick}
      className={`${styles.arrow}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 15 16'
    >
      {props.left && (
        <path d='M12.7782 6.5014H4.30511L7.98908 2.30916C8.1993 2.06922 8.31739 1.74378 8.31739 1.40445C8.31739 1.06512 8.1993 0.739687 7.98908 0.499743C7.77887 0.259799 7.49376 0.125 7.19647 0.125C6.89918 0.125 6.61407 0.259799 6.40386 0.499743L0.822083 6.87093C0.720449 6.99212 0.64078 7.13502 0.587648 7.29143C0.475992 7.60166 0.475992 7.94963 0.587648 8.25985C0.64078 8.41627 0.720449 8.55917 0.822083 8.68035L6.40386 15.0515C6.50764 15.171 6.63111 15.2658 6.76715 15.3305C6.90318 15.3952 7.0491 15.4285 7.19647 15.4285C7.34384 15.4285 7.48976 15.3952 7.6258 15.3305C7.76183 15.2658 7.8853 15.171 7.98908 15.0515C8.09372 14.9331 8.17677 14.7922 8.23344 14.6369C8.29012 14.4816 8.3193 14.315 8.3193 14.1468C8.3193 13.9786 8.29012 13.8121 8.23344 13.6568C8.17677 13.5015 8.09372 13.3606 7.98908 13.2421L4.30511 9.04988H12.7782C13.0743 9.04988 13.3583 8.91563 13.5676 8.67667C13.777 8.4377 13.8946 8.11359 13.8946 7.77564C13.8946 7.43769 13.777 7.11359 13.5676 6.87462C13.3583 6.63565 13.0743 6.5014 12.7782 6.5014Z' />
      )}
      {!props.left && (
        <path d='M14.2152 7.29143C14.162 7.13502 14.0824 6.99212 13.9807 6.87093L8.39895 0.499743C8.29486 0.380935 8.17129 0.286691 8.03529 0.222393C7.8993 0.158094 7.75354 0.125 7.60633 0.125C7.30905 0.125 7.02394 0.259799 6.81372 0.499743C6.70963 0.618551 6.62707 0.759597 6.57074 0.914827C6.5144 1.07006 6.48541 1.23643 6.48541 1.40445C6.48541 1.74378 6.60351 2.06922 6.81372 2.30916L10.4977 6.5014H2.02456C1.72848 6.5014 1.44453 6.63565 1.23518 6.87462C1.02582 7.11359 0.908203 7.43769 0.908203 7.77564C0.908203 8.11359 1.02582 8.4377 1.23518 8.67667C1.44453 8.91563 1.72848 9.04988 2.02456 9.04988H10.4977L6.81372 13.2421C6.70909 13.3606 6.62604 13.5015 6.56936 13.6568C6.51269 13.8121 6.48351 13.9786 6.48351 14.1468C6.48351 14.315 6.51269 14.4816 6.56936 14.6369C6.62604 14.7922 6.70909 14.9331 6.81372 15.0515C6.9175 15.171 7.04097 15.2658 7.17701 15.3305C7.31305 15.3952 7.45896 15.4285 7.60633 15.4285C7.75371 15.4285 7.89962 15.3952 8.03566 15.3305C8.1717 15.2658 8.29517 15.171 8.39895 15.0515L13.9807 8.68035C14.0824 8.55917 14.162 8.41627 14.2152 8.25985C14.3268 7.94963 14.3268 7.60166 14.2152 7.29143Z' />
      )}
    </svg>
    </div>
  );
}
