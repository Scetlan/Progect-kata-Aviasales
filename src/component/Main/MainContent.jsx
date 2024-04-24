import { SortTicket } from '../ContentMain/SortTicket/SortTicket';
import Ticket from '../ContentMain/Ticket/Ticket';
import uniqid from 'uniqid';

import classes from './Main.module.scss';
import { useSelector } from 'react-redux';

function MainContent({ tickets }) {
  const fetchState = useSelector(state => state.tickets);

  const isFilter =
    fetchState.newTickets.noneTransfers ||
    fetchState.newTickets.oneTransfer ||
    fetchState.newTickets.twoTransfers ||
    fetchState.newTickets.threeTransfers;

  const displayTickets = isFilter ? tickets.slice(0, fetchState.showMoreCount) : [];

  return (
    <main className={classes.content__main}>
      <SortTicket />
      {!isFilter ? (
        <span>Подходящие рейсы не найдены</span>
      ) : (
        displayTickets.map(ticket => {
          return <Ticket key={uniqid.time('ticket-')} {...ticket} />;
        })
      )}
      <Ticket />
    </main>
  );
}

export default MainContent;
