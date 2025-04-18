import styles from './Footer.module.scss';
import { ImFacebook } from 'react-icons/im';
import { FiInstagram } from 'react-icons/fi';
import {
  MdOutlineLocationOn,
  MdOutlineShoppingBag,
  MdRestaurant,
} from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { TypeFooter } from '@/Types';
import DeliveryPlatformLink from '../DeliveryPlatformLink';
import SocialNetworkLink from '../SocialNetworkLink';

function Footer(props?: TypeFooter) {
  const deliveryPlatformsList = props?.fields?.deliveryPlatformsList;

  return (
    <footer className={styles.footer}>
      <div className={styles.separator} />
      <p className={styles.firstLine}>Síguenos en / Follow us on:</p>
      <div className={styles.socialNetworksBox}>
        <SocialNetworkLink
          icon={FiInstagram}
          text='@lascalidosasburger'
          url='https://www.instagram.com/lascalidosasburger/'
        />
        <SocialNetworkLink
          icon={ImFacebook}
          text='lascalidosasburger'
          url='https://www.facebook.com/profile.php?id=100081292250093'
        />
      </div>

      <div className={styles.separator} />
      <p>
        <a
          href='https://maps.app.goo.gl/jzqeCFv89ZwihHRd9'
          target='_blank'
          rel='noreferrer'
        >
          <MdOutlineLocationOn />
          37 S Second St. Elizabeth New Jersey &nbsp;( <MdRestaurant />
          &nbsp;-&nbsp;
          <MdOutlineShoppingBag />)
        </a>
      </p>

      <p>
        <a href='https://wa.me/18622208239' rel='noreferrer' target='_blank'>
          <FaWhatsapp /> (862) 220 8239
        </a>
      </p>

      <div className={styles.separator} />
      
      <p>
        <a
          href='https://goo.gl/maps/SsPjhVtvM9vRK9Kd7'
          target='_blank'
          rel='noreferrer'
        >
          <MdOutlineLocationOn />
          13 Center St. Elizabeth New Jersey &nbsp;( <MdOutlineShoppingBag />)
        </a>
      </p>

      <p>
        <a href='https://wa.me/19735101954' rel='noreferrer' target='_blank'>
          <FaWhatsapp /> (973) 510 1954
        </a>
      </p>

      {deliveryPlatformsList ? (
        <>
          <div className={styles.separator} />
          <p className={styles.deliveryPartnersTitle}>
            Encuéntranos en / Find us on:
          </p>
          <div className={styles.deliveryPartnersBox}>
            {deliveryPlatformsList.map((platform) => (
              <DeliveryPlatformLink key={platform.sys.id} {...platform} />
            ))}
          </div>
        </>
      ) : null}
    </footer>
  );
}

export default Footer;
