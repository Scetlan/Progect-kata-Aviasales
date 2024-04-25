import { SortTicket } from '../ContentMain/SortTicket/SortTicket';
import Ticket from '../ContentMain/Ticket/Ticket';
import uniqid from 'uniqid';

import classes from './Main.module.scss';
import { useSelector } from 'react-redux';

function MainContent({ tickets }) {
  const fetchState = useSelector(state => state.tickets);

  const isFilter =
    fetchState.stateCheckBox.noneTransfers ||
    fetchState.stateCheckBox.oneTransfer ||
    fetchState.stateCheckBox.twoTransfers ||
    fetchState.stateCheckBox.threeTransfers;

  const displayTickets = [];
  if (isFilter) {
    for (let i = 0; i < fetchState.showMoreCount; i++) {
      displayTickets.push(tickets[i]);
    }
  }

  return (
    <main className={classes.content__main}>
      <SortTicket />
      {!isFilter ? (
        <p className={classes.search__error}>Подходящие рейсы не найдены</p>
      ) : (
        displayTickets.map(ticket => {
          return (
            <ul className={classes.ticket}>
              <Ticket key={uniqid.time('ticket-')} {...ticket} />
            </ul>
          );
        })
      )}
    </main>
  );
}

export default MainContent;
