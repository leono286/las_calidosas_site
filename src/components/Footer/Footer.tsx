import styles from './Footer.module.scss'
import { ImFacebook } from 'react-icons/im'
import { FiInstagram } from 'react-icons/fi'
import { MdOutlineLocationOn } from 'react-icons/md'
import { FaWhatsapp } from 'react-icons/fa'
import { IconType } from 'react-icons'

function Footer({ hideLocation, hidePhone }: { hideLocation?: boolean; hidePhone?: boolean }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.separator} />
      <p className={styles.firstLine}>Síguenos en / Follow us on:</p>
      <div className={styles.socialNetworksBox}>
        <a
          href='https://www.instagram.com/lascalidosasburger/'
          target='_blank'
          rel='noreferrer'
        >
          <SocialNetwork icon={FiInstagram} text='@lascalidosasburger' />
        </a>
        <a
          href='https://www.facebook.com/profile.php?id=100081292250093'
          target='_blank'
          rel='noreferrer'
        >
          <SocialNetwork icon={ImFacebook} text='lascalidosasburger' />
        </a>
      </div>
      {!hideLocation ? (
        <p>
          <a
            href='https://goo.gl/maps/SsPjhVtvM9vRK9Kd7'
            target='_blank'
            rel='noreferrer'
          >
            <MdOutlineLocationOn />
            13 Center St. Elizabeth New Jersey
          </a>
        </p>
      ) : null}
      {!hidePhone ? (
        <p>
          <a href='https://wa.me/19735101954' rel='noreferrer' target='_blank'>
            <FaWhatsapp /> (973) 510 1954
          </a>
        </p>
      ) : null}
    </footer>
  )
}

export default Footer

function SocialNetwork({ icon: Icon, text }: { icon: IconType; text: string }) {
  return (
    <div className={styles.socialNetwork}>
      <div className='icon-wrapper'>
        <Icon />
      </div>
      <span className='text'>{text}</span>
    </div>
  )
}
