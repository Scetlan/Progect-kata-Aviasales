import { useDispatch, useSelector } from 'react-redux';
import classes from './Sort.module.scss';
import { fetchTicketsSort, ticketsActions } from '../../../redux/reducer/ticketsSlice';
import ButtonSortTicket from '../../wrapperComponents/ButtonSortTicket';
import { useEffect } from 'react';

function SortTicket() {
  const dispatch = useDispatch();

  // const fakeLoading = useSelector(state => state.ticketsReducer.fakeLoading);
  const sortedType = useSelector(state => state.ticketsReducer.sortType);

  useEffect(() => {
    dispatch(ticketsActions.executeFilter());
    dispatch(fetchTicketsSort());
  }, [dispatch, sortedType]);

  return (
    <section className={classes['price-segment']}>
      <ul className={classes['link__btn-price']}>
        <li className="link__item">
          <ButtonSortTicket
            onClick={() => dispatch(ticketsActions.setSortType('cheap'))}
            type={sortedType === 'cheap' ? 'active' : 'disabled'}
          >
            Самый дешевый
          </ButtonSortTicket>
        </li>
        <li className="link__item">
          <ButtonSortTicket
            onClick={() => dispatch(ticketsActions.setSortType('fast'))}
            type={sortedType === 'fast' ? 'active' : 'disabled'}
          >
            Самый быстрый
          </ButtonSortTicket>
        </li>
        <li className="link__item">
          <ButtonSortTicket
            onClick={() => dispatch(ticketsActions.setSortType('optimal'))}
            type={sortedType === 'optimal' ? 'active' : 'disabled'}
          >
            Оптимальный
          </ButtonSortTicket>
        </li>
      </ul>
    </section>
  );
}

export { SortTicket };
