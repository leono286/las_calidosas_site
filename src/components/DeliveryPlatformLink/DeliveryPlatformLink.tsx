import { Entry } from 'contentful';
import { TypeDeliveryPlatformFields } from '@/Types';
import { CSSProperties } from 'react';
import styles from './DeliveryPlatformLink.module.scss';

function DeliveryPlatformLink({
  fields: { name, url, logo, logoMd, backgroundColor },
}: Entry<TypeDeliveryPlatformFields>) {

  return (
    <div
      className={styles.box}
      style={{ '--bg-color': backgroundColor } as CSSProperties}
    >
      <a href={url} target='_blank' rel='noopener noreferrer'>
        <picture>
          {logoMd ? (
            <source
              media='(min-width: 767px)'
              srcSet={logoMd.fields.file.url}
            />
          ) : null}
          <img className={styles[name]} src={logo.fields.file.url} alt={name} />
        </picture>
      </a>
    </div>
  );
}

export default DeliveryPlatformLink;
