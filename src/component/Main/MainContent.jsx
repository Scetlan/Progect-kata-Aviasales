import classes from './Main.module.scss';
import SortTicket from '../ContentMain/SortTicket/SortTicket';
import Ticket from '../ContentMain/Ticket/Ticket';
import { ticketsActions } from '../../redux/reducer/ticketsSlice';
import uniqid from 'uniqid';

import { useDispatch, useSelector } from 'react-redux';

function MainContent({ tickets }) {
  const dispatch = useDispatch();
  const fetchState = useSelector(state => state.tickets);

  const isFilter =
    fetchState.stateCheckBox.noneTransfers ||
    fetchState.stateCheckBox.oneTransfer ||
    fetchState.stateCheckBox.twoTransfers ||
    fetchState.stateCheckBox.threeTransfers;

  const displayTickets = isFilter ? tickets.slice(0, fetchState.showMoreCount) : [];

  return (
    <main className={classes.content__main}>
      <SortTicket />
      {!isFilter ? (
        <p className={classes.search__error}>Подходящие рейсы не найдены</p>
      ) : (
        displayTickets.map(ticket => (
          <ul className={classes.ticket}>
            <Ticket
              key={uniqid.time('ticket-')}
              carrier={ticket.carrier}
              price={ticket.price}
              segments={ticket.segments}
            />
          </ul>
        ))
      )}
      {isFilter && (
        <button
          type="button"
          aria-label="show more ticket"
          className={classes.more}
          onClick={() => dispatch(ticketsActions.showMore())}
        >
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      )}
    </main>
  );
}

export default MainContent;
