import styles from './SocialNetworkLink.module.scss';
import { IconType } from 'react-icons';

function SocialNetworkLink({
  icon: Icon,
  text,
  url,
}: {
  icon: IconType;
  text: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target='_blank'
      rel='noreferrer'
    >
      <div className={styles.socialNetwork}>
        <div className='icon-wrapper'>
          <Icon />
        </div>
        <span className='text'>{text}</span>
      </div>
    </a>
  );
}

export default SocialNetworkLink;
