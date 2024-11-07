import { TypeFooterNewSiteFields, TypeMenu, TypeMenuFields } from '@/Types';
import { Entry } from 'contentful';
import CustomMarquee from '../Marquee';
import NewFooter from '../NewFooter';
import PageGradient from '../PageGradient';
import styles from './ContactUsPage.module.scss';

function ContactUsPage({
  footerData,
}: {
  footerData: Entry<TypeFooterNewSiteFields>;
}) {

  const { locations, deliveryPlatformsList } = footerData.fields;

  return (
    <div className={styles.container}>
      <PageGradient />

      <div className={styles.contentWrapper}>
        <CustomMarquee text={'MOR, NO TE QUEDES CON EL ANTOJO'} />

        <div className={styles.content}>
          <NewFooter
            locations={locations}
            deliveryPlatformsList={deliveryPlatformsList}
          />
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
