import styles from './ThemeSwitch.module.css';
import { useTheme } from '../../../context/ThemeContext';

const ThemeSwitch = () => {
  const { toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };
  return (
    <div className={`${styles.toggleWrapper}`}>
      <input
        type='checkbox'
        className={`${styles.dn}`}
        id='dn'
        onChange={handleToggle}
      />
      <label
        htmlFor='dn'
        className={`${styles.toggle}`}
      >
        <span className={`${styles.toggle__handler}`}>
          <span
            className={`${styles.crater} ${styles.crater1}`}
          ></span>
          <span
            className={`${styles.crater} ${styles.crater2}`}
          ></span>
          <span
            className={`${styles.crater} ${styles.crater3}`}
          ></span>
        </span>
        <span className={`${styles.star} ${styles.star1}`}></span>
        <span className={`${styles.star} ${styles.star2}`}></span>
        <span className={`${styles.star} ${styles.star3}`}></span>
        <span className={`${styles.star} ${styles.star4}`}></span>
        <span className={`${styles.star} ${styles.star5}`}></span>
        <span className={`${styles.star} ${styles.star6}`}></span>
      </label>
    </div>
  );
};

export default ThemeSwitch;
