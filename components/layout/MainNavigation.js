import Link from 'next/link';

import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>My Memories</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Memories</Link>
          </li>
          <li>
            <Link href='/new-memory'>Add New Memory</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;