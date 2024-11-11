import styles from './NewFooter.module.scss';
import { TypeFooterNewSiteFields } from '@/Types';
import DeliveryPlatformLink from '../DeliveryPlatformLink';
import BrushStrokeText from '../BrushStrokeText';
import FrontDoorPic from '../../assets/front_door_pic.png';
import Image from 'next/image';
import LocationInfoItem from '../LocationInfoItem';

function NewFooter({
  locations,
  deliveryPlatformsList,
}: TypeFooterNewSiteFields) {
  // const deliveryPlatformsList = props?.fields?.deliveryPlatformsList;

  return (
    <footer className={styles.footer}>
      <div className={styles.locations}>
        <div className={styles.locationsTitle}>
          <BrushStrokeText
            text='CAÉ Y PARCHAMOS'
            elementSize='special-size'
            className='hide-on-xsmall show-on-medium'
            color='white'
          />
          <BrushStrokeText
            text='CAÉ Y'
            elementSize='special-size'
            className='hide-on-medium'
            color='white'
          />
          <BrushStrokeText
            text='PARCHAMOS'
            elementSize='special-size'
            className='hide-on-medium'
            color='white'
          />
        </div>
        <div className={styles.imageWrapper}>
          <Image src={FrontDoorPic} alt='' fill />
        </div>

        <div className={styles.locationsList}>
          {locations.map((location) => (
            <LocationInfoItem key={location.sys.id} location={location} />
          ))}
        </div>
      </div>
      <div className={styles.delivery}>
        <BrushStrokeText
          className={styles.deliveryTitle}
          text='Ó TE LO LLEVAMOS'
          elementSize='medium'
          color='white'
        />
        <div className={styles.deliveryPlatformsList}>
          {deliveryPlatformsList?.map((deliveryPlatform) => <DeliveryPlatformLink key={deliveryPlatform.sys.id} {...deliveryPlatform}/>)}
        </div>
      </div>
    </footer>
  );
}

export default NewFooter;
