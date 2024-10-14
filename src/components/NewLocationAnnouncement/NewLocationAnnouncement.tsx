import styles from './NewLocationAnnouncement.module.scss';
import CelebrateIcon from '@/assets/svg/celebrationIcon.svg';
import { MdOutlineLocationOn } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

function NewLocationAnnouncement() {
  return (
    <div className={styles.announcement}>
      <div className={styles.icon}>
        <CelebrateIcon />
      </div>
      <div className={styles.content}>
        <h2>
          Caé y parchamos <br /> en nuestro nuevo local!!
        </h2>
        <p className={styles.text}>
          Abrimos un segundo local donde puedes venir y disfrutar en familia de
          nuestro tradicional sabor a calle colombiana. <br /> Te esperamos!.
        </p>
        <p className={styles.location}>
          <a
            href='https://maps.app.goo.gl/jzqeCFv89ZwihHRd9'
            target='_blank'
            rel='noreferrer'
          >
            <MdOutlineLocationOn size={28} />
            37 S Second St. Elizabeth New Jersey
          </a>
        </p>
        <p className={styles.phone}>
          <a href='https://wa.me/18622208239' rel='noreferrer' target='_blank'>
            <FaWhatsapp /> (862) 220 8239
          </a>
        </p>
      </div>
    </div>
  );
}

export default NewLocationAnnouncement;
