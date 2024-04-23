import MenuFilterTicket from '../AsideMenu/MenuFilterTicket';
import Ticket from './Ticket/Ticket';
import classes from './MainContainerListTicket.module.scss';
import { Api } from '../../redux/fetchRequests';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchNewTickets, loadingTickets } from '../../redux/reducer/ticketsSlice';
import { SortTicket } from './SortTicket/SortTicket';

const api = new Api();

export function MainContainerListTicket() {
  let dispatch = useDispatch();
  const isReceivedFetchData = useSelector(state => state.ticketsReducer.isReceivedFetchData);
  const error = useSelector(state => state.ticketsReducer.error);
  const modified = useSelector(state => state.ticketsReducer.modifiedTickets);
  const fetchLoading = useSelector(state => state.ticketsReducer.fetchLoading);
  const ticketsStop = useSelector(state => state.ticketsReducer.stop);

  useEffect(() => {
    async function initSession() {
      const sessionKey = Cookies.get('session');

      if (sessionKey) {
        Cookies.remove('session');
      }

      const newSession = await api.createSession();
      Cookies.set('session', newSession.searchId);
      dispatch(fetchNewTickets());
    }
    initSession();
  }, [dispatch]);

  useEffect(() => {
    const sessionKey = Cookies.get('session');

    if ((!ticketsStop && fetchLoading === 'fulfilled') || (!ticketsStop && error)) {
      dispatch(fetchNewTickets());
    }

    if (ticketsStop && sessionKey) {
      Cookies.remove('session');
    }
  }, [dispatch, fetchLoading, ticketsStop, error]);

  useEffect(() => {
    if (isReceivedFetchData) {
      dispatch(loadingTickets());
    }
  }, [dispatch, modified, isReceivedFetchData]);

  return (
    <section className={classes.content}>
      <MenuFilterTicket />
      <main className={classes.content__main}>
        <SortTicket />
        <Ticket />
      </main>
    </section>
  );
}
