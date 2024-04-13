import classes from './Ticket.module.scss';

function Ticket() {
  return (
    <ul className={classes['link-tickets']}>
      <li className={classes.ticket}>
        <h2 className={classes.title}>13500 р</h2>
        <ul className={classes['link-flight']}>
          <li className={classes['item-flight']}>
            <span className={classes['item-title']}>MOW – HKT</span>
            <span>10:45 – 08:00</span>
          </li>
          <li className={classes['item-flight']}>
            <span className={classes['item-title']}>В пути</span>
            <span>21ч 15м</span>
          </li>
          <li className={classes['item-flight']}>
            <span className={classes['item-title']}>2 пересадки</span>
            <span>HKG, JNB</span>
          </li>
        </ul>
        <ul className={classes['link-flight']}>
          <li className={classes['item-flight']}>
            <span className={classes['item-title']}>MOW – HKT</span>
            <span>11:20 – 00:50</span>
          </li>
          <li className={classes['item-flight']}>
            <span className={classes['item-title']}>В пути</span>
            <span>13ч 30м</span>
          </li>
          <li className={classes['item-flight']}>
            <span className={classes['item-title']}>1 пересадка</span>
            <span>HKG</span>
          </li>
        </ul>
      </li>
      <li className={classes.ticket}>
        <h2 className={classes.title}>13500 р</h2>
        <ul className={classes['link-flight']}>
          <li className={classes['item-flight']}>
            <span className={classes['item-title']}>MOW – HKT</span>
            <span>10:45 – 08:00</span>
          </li>
          <li className={classes['item-flight']}>
            <span className={classes['item-title']}>В пути</span>
            <span>21ч 15м</span>
          </li>
          <li className={classes['item-flight']}>
            <span className={classes['item-title']}>2 пересадки</span>
            <span>HKG, JNB</span>
          </li>
        </ul>
        <ul className={classes['link-flight']}>
          <li className={classes['item-flight']}>
            <span className={classes['item-title']}>MOW – HKT</span>
            <span>11:20 – 00:50</span>
          </li>
          <li className={classes['item-flight']}>
            <span className={classes['item-title']}>В пути</span>
            <span>13ч 30м</span>
          </li>
          <li className={classes['item-flight']}>
            <span className={classes['item-title']}>1 пересадка</span>
            <span>HKG</span>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default Ticket;
