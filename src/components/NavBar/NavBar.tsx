import styles from './NavBar.module.scss';
import ShoppingBagSVG from '@/assets/svg/shoppingBagIcon.svg';
import MenuIconSVG from '@/assets/svg/forkKnifeIcon.svg';
import HomeIconSVG from '@/assets/svg/homeIcon.svg';
import { motion } from 'framer-motion';
import { ReactElement, useEffect, useRef, useState } from 'react';

export type NavBarItem = { label: 'Inicio' | 'Menú' | 'Delivery'; icon: ReactElement };

const navBarItems: NavBarItem[] = [
  { label: 'Inicio', icon: <HomeIconSVG /> },
  { label: 'Menú', icon: <MenuIconSVG /> },
  { label: 'Delivery', icon: <ShoppingBagSVG /> },
];

function NavBar({
  activeSection,
  onItemClick,
}: {
  activeSection: NavBarItem['label'],
  onItemClick?: (item: NavBarItem['label']) => void;
}) {
  
  const nabVarRef = useRef<HTMLDivElement>(null);
  const [indicatorXPos, setIndicatorXPos] = useState(8);

  useEffect(() => {
    if (nabVarRef.current) {
      const activeItemButton = nabVarRef.current.querySelector(
        `.${styles.active}`,
      );

      const activeButtonLeft = activeItemButton!.getBoundingClientRect().left;
      const navBarLeft = nabVarRef.current.getBoundingClientRect().left;
      const navBarComputedStyle = window.getComputedStyle(nabVarRef.current);

      const activeButtonXPos =
        activeButtonLeft -
        navBarLeft -
        parseFloat(navBarComputedStyle.paddingLeft) -
        parseFloat(navBarComputedStyle.borderLeftWidth);

      setIndicatorXPos(activeButtonXPos);
    }
  }, [activeSection]);

  return (
    <div className={styles.navbar} ref={nabVarRef}>
      {navBarItems.map(({ label, icon }) => (
        <button
          key={label}
          className={`${styles.button} ${
            activeSection === label ? styles.active : null
          }`}
          onClick={() => onItemClick?.(label)}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
      <motion.div
        className={styles.indicator}
        initial={false}
        animate={{ x: indicatorXPos }}
        transition={{
          x: { type: 'spring', bounce: 0, duration: 0.2 },
          ease: 'easeOut',
        }}
      />
    </div>
  );
}

export default NavBar;
