import classes from './Ticket.module.scss';
import arrivalTime from '../../../utils/arrivalTime';
import { lightFormat } from 'date-fns';
import uniqid from 'uniqid';

function Ticket({ carrier, price, segments }) {
  return (
    <li key={uniqid.time('ticket__item-')} className={classes.ticket__item}>
      <section className={classes['ticket__item-price']}>
        <span className={classes.price}>{price} P</span>
        <img
          src={`https://pics.avs.io/99/36/${carrier}.png`}
          alt="airline logo"
          className={classes.logo}
        />
      </section>
      <ul className={classes['ticket-lists']}>
        {carrier &&
          price &&
          segments[0] &&
          segments.map(({ origin, destination, stops, duration, date }) => {
            let transfer;
            if (stops.length === 0) {
              transfer = 'БЕЗ ПЕРЕСАДОК';
            } else if (stops.length === 1) {
              transfer = '1 ПЕРЕСАДКА';
            } else {
              transfer = `${stops.length} ПЕРЕСАДКИ`;
            }
            return (
              <li key={date} className={classes['ticket-lists__item']}>
                <div className={classes.path}>
                  <span className={classes.cities}>
                    {origin} - {destination}
                  </span>
                  <span className={classes.time}>
                    {lightFormat(new Date(date), 'HH:mm')} - {arrivalTime(date, duration)}
                  </span>
                </div>
                <div className={classes.path}>
                  <span className={classes.cities}>B ПУТИ</span>
                  <span
                    className={classes.time}
                  >{`${Math.trunc(duration / 60)}ч ${duration % 60}м`}</span>
                </div>
                <div className={classes.path}>
                  <span className={classes.cities}>{transfer}</span>
                  <span className={classes.time}>{stops.join(', ')}</span>
                </div>
              </li>
            );
          })}
      </ul>
    </li>
  );
}

export default Ticket;
