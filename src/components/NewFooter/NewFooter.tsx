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
            elementSize='medium'
            className='hide-on-small show-on-medium'
            color='white'
          />
          <BrushStrokeText
            text='CAÉ Y'
            elementSize='medium'
            className='hide-on-medium'
            color='white'
          />
          <BrushStrokeText
            text='PARCHAMOS'
            elementSize='medium'
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
    </footer>
  );
}

export default NewFooter;
