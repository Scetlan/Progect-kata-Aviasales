import classes from './Sort.module.scss';
import ButtonSortTicket from '../../wrapperComponents/ButtonSortTicket';
import { fetchTicketsSort, ticketsActions } from '../../../redux/reducer/ticketsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function SortTicket() {
  const dispatch = useDispatch();
  const stateFetch = useSelector(state => state.tickets);

  useEffect(() => {
    dispatch(fetchTicketsSort());
  }, [dispatch, stateFetch.sort]);

  return (
    <ul className={classes.category__price}>
      <li className={classes.link__item}>
        <ButtonSortTicket
          id="one"
          onClick={() => dispatch(ticketsActions.setSort('cheap'))}
          type={stateFetch.sort === 'cheap' ? 'active' : 'disabled'}
        >
          Самый дешевый
        </ButtonSortTicket>
      </li>
      <li className={classes.link__item}>
        <ButtonSortTicket
          id="two"
          onClick={() => dispatch(ticketsActions.setSort('fast'))}
          type={stateFetch.sort === 'fast' ? 'active' : 'disabled'}
        >
          Самый быстрый
        </ButtonSortTicket>
      </li>
      <li className={classes.link__item}>
        <ButtonSortTicket
          id="three"
          onClick={() => dispatch(ticketsActions.setSort('optimal'))}
          type={stateFetch.sort === 'optimal' ? 'active' : 'disabled'}
        >
          Оптимальный
        </ButtonSortTicket>
      </li>
    </ul>
  );
}

export default SortTicket;
