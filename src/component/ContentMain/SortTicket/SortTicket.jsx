import { useDispatch, useSelector } from 'react-redux';
import classes from './Sort.module.scss';
import ButtonSortTicket from '../../wrapperComponents/ButtonSortTicket';
import { ticketsActions } from '../../../redux/reducer/ticketsSlice';

function SortTicket() {
  const dispatch = useDispatch();
  const stateFetch = useSelector(state => state.tickets);
  const { sort } = stateFetch;
  return (
    <section className={classes['price-segment']}>
      <ul className={classes['link__btn-price']}>
        <li className="link__item">
          <ButtonSortTicket
            onClick={() => dispatch(ticketsActions.setSort('cheap'))}
            type={sort === 'cheap' ? 'active' : 'disabled'}
          >
            Самый дешевый
          </ButtonSortTicket>
        </li>
        <li className="link__item">
          <ButtonSortTicket
            onClick={() => dispatch(ticketsActions.setSort('fast'))}
            type={sort === 'fast' ? 'active' : 'disabled'}
          >
            Самый быстрый
          </ButtonSortTicket>
        </li>
        <li className="link__item">
          <ButtonSortTicket
            onClick={() => dispatch(ticketsActions.setSort('optimal'))}
            type={sort === 'optimal' ? 'active' : 'disabled'}
          >
            Оптимальный
          </ButtonSortTicket>
        </li>
      </ul>
    </section>
  );
}

export { SortTicket };
