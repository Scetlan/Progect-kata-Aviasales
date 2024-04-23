import { useDispatch, useSelector } from 'react-redux';
import classes from './Ticket.module.scss';
import { getTime } from './Time';
import { getEndingTransfer } from './getEndingTransfer';
import ButtonSortTicket from '../../wrapperComponents/ButtonSortTicket';
import { loadingTickets, ticketsActions } from '../../../redux/reducer/ticketsSlice';
import React from 'react';

function Ticket() {
  const dispatch = useDispatch();

  const progressivelyLoadedTickets = useSelector(
    state => state.ticketsReducer.progressivelyLoadedTickets
  );
  const isReceivedFetchData = useSelector(state => state.ticketsReducer.isReceivedFetchData);
  const error = useSelector(state => state.ticketsReducer.error);
  const fakeLoading = useSelector(state => state.ticketsReducer.fakeLoading);

  function renderSegment(segment) {
    function formatTimer(duration) {
      const hoursString = Math.floor(duration / 60)
        .toString()
        .padStart(2, '0');
      const minutesString = (duration % 60).toString().padStart(2, '0');
      return {
        hoursString,
        minutesString,
      };
    }
    const timer = formatTimer(segment.duration);
    const travelTime = `${timer.hoursString}ч ${timer.minutesString}м`;
    return (
      <div className="list">
        <ul className={classes['link-flight']}>
          <li className={classes['item-flight']}>
            <span className={classes['item-title']}>
              {segment.origin} - {segment.destination}
            </span>
            <span>{getTime(segment.date, segment.duration)}</span>
          </li>
          <li className={classes['item-flight']}>
            <span className={classes['item-title']}>В пути</span>
            <span>{travelTime}</span>
          </li>
          <li className={classes['item-flight']}>
            <span className={classes['item-title']}>
              {segment.stops.length + ' '}
              {getEndingTransfer(segment.stops.length)}
            </span>
            <span className={classes.stops}>
              {segment.stops.map((stop, index) => (
                <span key={index} mode="primary" className={classes.stopParagraph}>
                  {stop}
                </span>
              ))}
            </span>
          </li>
        </ul>
      </div>
    );
  }

  function renderLoader() {
    if (fakeLoading === 'pending' || !isReceivedFetchData) {
      return (
        <div className="fideLoader">
          {/* <Spinner className="ticketsLoader" /> */}
          aaaaaaaaaa
        </div>
      );
    }
  }

  function renderTickets() {
    if (error) {
      return <span style={{ marginBlock: '50px' }}> Возникла ошибка</span>;
    }

    if (progressivelyLoadedTickets.length === 0 && fakeLoading === 'fulfilled') {
      return <span style={{ marginBlock: '50px' }}> Рейсы не найдены</span>;
    }

    return progressivelyLoadedTickets.map(ticket => {
      const formatAmount = new Intl.NumberFormat('ru').format(ticket.price);
      return (
        <div className="logoCompany">
          <div className={classes.tickets}>
            <h2 className={classes.ticketsPrice} mode="success">
              {formatAmount} P
            </h2>
            <img
              src={`//pics.avs.io/99/36/${ticket.carrier}.png`}
              alt={`CompanyLogo ${ticket.carrier}`}
            />
          </div>
          <div className={classes.segments}>
            {ticket.segments.map(segment => renderSegment(segment))}
          </div>
        </div>
      );
    });
  }

  return (
    <React.Fragment>
      <div className={classes.ticket}>
        {renderLoader()}
        {renderTickets()}
        {!error && progressivelyLoadedTickets.length >= 5 && (
          <ButtonSortTicket
            onClick={async () => {
              dispatch(ticketsActions.addQuantityTikets());
              await dispatch(loadingTickets());
            }}
            type="active"
          >
            <span className="primary">Показать еще 5 билетов!</span>
          </ButtonSortTicket>
        )}
      </div>
    </React.Fragment>
  );
}

export default Ticket;
