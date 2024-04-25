import classes from './App.module.scss';
import img from './images/Logo.svg';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFetchTickets,
  getFilterTickets,
  searchId,
  ticketsActions,
} from './redux/reducer/ticketsSlice';
import MenuFilterTicket from './component/AsideMenu/MenuFilterTicket';
import MainContent from './component/Main/MainContent';

function App() {
  const dispatch = useDispatch();
  const stateFetch = useSelector(state => state.tickets);

  const [isLoading, setIsLoading] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(searchId());
  }, [dispatch]);

  useEffect(() => {
    if (stateFetch.searchId && !stateFetch.stop && !stateFetch.loading)
      dispatch(getFetchTickets(stateFetch.searchId));
    if (stateFetch.stop) setIsLoading(false);
  }, [stateFetch.searchId, stateFetch.loading, dispatch, stateFetch.stop]);

  useEffect(() => {
    setIsFilter(false);
    if (stateFetch.tickets.length !== 0) {
      dispatch(getFilterTickets(stateFetch));
      setIsFilter(true);
    }
  }, [
    stateFetch.stateCheckBox.all,
    stateFetch.stateCheckBox.noneTransfers,
    stateFetch.stateCheckBox.oneTransfer,
    stateFetch.stateCheckBox.twoTransfers,
    stateFetch.stateCheckBox.threeTransfers,
    stateFetch.tickets,
    dispatch,
  ]);

  const { setSort } = ticketsActions;

  useEffect(() => {
    if (stateFetch.newTickets.length !== 0) {
      if (stateFetch.sort === 'cheap') dispatch(setSort('cheap'));
      if (stateFetch.sort === 'fast') dispatch(setSort('fast'));
      if (stateFetch.sort === 'optimal') dispatch(setSort('optimal'));
    }
  }, [stateFetch.newTickets, dispatch, stateFetch.sort]);

  return (
    <div className={classes['aviation-content']}>
      <header className={classes.pictures}>
        <img className={classes.icon} src={img} alt="" />
      </header>
      {(stateFetch.loading || isLoading) && <p className={classes.loading}>Loading ...</p>}
      <section className={classes.content}>
        {isFilter && <MenuFilterTicket />}
        {isFilter && <MainContent tickets={stateFetch.newTickets} />}
      </section>
    </div>
  );
}

export default App;
