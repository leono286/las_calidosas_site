import { TypeLocation } from '@/Types';
import styles from './LocationInfoItem.module.scss';
import { MdOutlineLocationOn } from 'react-icons/md';
import MenuIconSVG from '@/assets/svg/forkKnifeIcon.svg';
import ShoppingBagSVG from '@/assets/svg/shoppingBagIcon.svg';
import { FaCaretDown, FaWhatsapp } from 'react-icons/fa';
import { useEffect, useState } from 'react';

type WeekDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

type OpenHours = Partial<{ [key in WeekDay]: string }>[];

function LocationInfoItem({ location }: { location: TypeLocation }) {
  const { address, phone, phone2, serviceType, openHours, mapsLink } =
    location.fields;

  const typedOpenHours = openHours as OpenHours;

  const [hoursCollapsed, setHoursCollapsed] = useState(true);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>();

  const addressToShow = address.split(',');

  const phoneNumberForLink = phone
    .replace(/-/g, '')
    .replace(/ /g, '')
    .replace(/[()]/g, '');
  const phoneNumberForLink2 = phone2
    ? phone.replace(/-/g, '').replace(/ /g, '').replace(/[()]/g, '')
    : undefined;

  useEffect(() => {
    const date = new Date();

    const currentDay = date.toLocaleDateString('en-us', {
      weekday: 'long',
    }) as WeekDay;

    const currentDayIndex = (openHours as OpenHours).findIndex(
      (value) => Object.keys(value)[0] === currentDay,
    );

    setCurrentDayIndex(currentDayIndex);
  }, [openHours]);

  return (
    <div className={styles.locationContainer}>
      <p className={styles.address}>
        {addressToShow[0]}, <span>{addressToShow[1].trim()}</span>
      </p>
      <p className={styles.serviceType}>
        {serviceType.length === 2 ? (
          <>
            Para Parchar y/o LLevar <MenuIconSVG /> <ShoppingBagSVG />
          </>
        ) : (
          <>
            Para LLevar <ShoppingBagSVG />
          </>
        )}
      </p>
      <p className={styles.phone}>
        <a
          href={`https://wa.me/1${phoneNumberForLink}`}
          rel='noreferrer'
          target='_blank'
        >
          <FaWhatsapp /> {phone}
        </a>
      </p>
      {phoneNumberForLink2 ? (
        <p className={styles.phone}>
          <a
            href={`https://wa.me/1${phoneNumberForLink2}`}
            rel='noreferrer'
            target='_blank'
          >
            <FaWhatsapp /> {phone2}
          </a>
        </p>
      ) : null}
      {typedOpenHours && currentDayIndex !== undefined ? (
        <div className={styles.openHours}>
          <div onClick={() => setHoursCollapsed(!hoursCollapsed)}>
            <strong>Hours:&nbsp;&nbsp;</strong>
            <span
              className={`${styles.todayHours} ${
                !hoursCollapsed ? styles.nv : ''
              }`}
            >
              {Object.values((openHours as OpenHours)[currentDayIndex])}
            </span>
            <div
              className={`${styles.weekHours} ${
                hoursCollapsed ? styles.nv : ''
              }`}
            >
              <table>
                <tbody>
                  {typedOpenHours.map((dayHours, index) => {
                    const [day, hours] = Object.entries(dayHours)[0] as [
                      WeekDay,
                      string,
                    ];

                    return (
                      <tr
                        key={day}
                        className={
                          index === currentDayIndex ? styles.today : ''
                        }
                      >
                        <td>{day}</td>
                        <td>{hours}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {hoursCollapsed ? (
              <span className={styles.caret}>
                <FaCaretDown />
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
      <p className={styles.mapsLink}>
        <a href={mapsLink} target='_blank' rel='noreferrer'>
          <MdOutlineLocationOn />
          Abrir mapa
        </a>
      </p>
    </div>
  );
}

export default LocationInfoItem;
