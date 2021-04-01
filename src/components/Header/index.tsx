import Link from 'next/link';
import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.container}>
      <div className={styles.innerContainer}>
        <Link href="/">
          <a>
            <img className={styles.logo} src="/Logo.svg" alt="logo" />
          </a>
        </Link>
      </div>
    </header>
  );
}
