import { TypeLocation } from '@/Types';
import styles from './LocationInfoItem.module.scss';
import { MdOutlineLocationOn, MdOutlineShoppingBag, MdRestaurant } from 'react-icons/md';
import { FaCaretDown, FaCaretUp, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
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
  const { address, phone, serviceType, openHours, mapsLink } = location.fields;

  const typedOpenHours = openHours as OpenHours;

  const [hoursCollapsed, setHoursCollapsed] = useState(true);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>();

  const addressToShow = address.split(',');

  const phoneNumberForLink = phone.replace(/-/g, '').replace(/ /g, '');

  useEffect(() => {
    const date = new Date(1730813421000);

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
            Para Parchar y/o LLevar <MdRestaurant /> <MdOutlineShoppingBag />
          </>
        ) : (
          <>
            Para LLevar <MdOutlineShoppingBag />
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
      {typedOpenHours && currentDayIndex !== undefined ? (
        <div className={styles.openHours}>
          <p onClick={() => setHoursCollapsed(!hoursCollapsed)}>
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
                {typedOpenHours.map((dayHours, index) => {
                  const [day, hours] = Object.entries(dayHours)[0] as [
                    WeekDay,
                    string,
                  ];

                  return (
                    <tr
                      key={day}
                      className={index === currentDayIndex ? styles.today : ''}
                    >
                      <td>{day}</td>
                      <td>{hours}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
            {hoursCollapsed ? (
              <span className={styles.caret}>
                <FaCaretDown />
              </span>
            ) : null}
          </p>
        </div>
      ) : null}
      <p className={styles.mapsLink}>
        <a
          href={mapsLink}
          target='_blank'
          rel='noreferrer'
        >
          <MdOutlineLocationOn />
          Abrir mapa
        </a>
      </p>
    </div>
  );
}

export default LocationInfoItem;