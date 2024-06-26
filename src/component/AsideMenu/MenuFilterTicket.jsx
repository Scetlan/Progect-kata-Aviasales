import classes from './MenuFilterTicket.module.scss';
import Checkbox from '../wrapperComponents/Checkbox';
import { fetchTicketsSort, ticketsActions } from '../../redux/reducer/ticketsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function MenuFilterTicket() {
  const dispatch = useDispatch();
  const stateFetch = useSelector(state => state.tickets);

  const { setIsChecked } = ticketsActions;

  const { all, noneTransfers, oneTransfers, twoTransfers, threeTransfers } =
    stateFetch.stateCheckBox;

  useEffect(() => {
    dispatch(fetchTicketsSort());
  }, [dispatch, stateFetch.stateCheckBox]);

  return (
    <aside className={classes.content__menu}>
      <h1 className={classes.content__title}>Количество пересадок</h1>
      <Checkbox
        id="all"
        checked={all}
        value={'all'}
        onChange={() => {
          dispatch(setIsChecked('all'));
        }}
        text="Все"
      />
      <Checkbox
        id="off"
        checked={noneTransfers}
        value={'noneTransfers'}
        onChange={() => {
          dispatch(setIsChecked('noneTransfers'));
        }}
        text="Без пересадок"
      />
      <Checkbox
        id="one"
        checked={oneTransfers}
        value={'oneTransfers'}
        onChange={() => {
          dispatch(setIsChecked('oneTransfers'));
        }}
        text="1 пересадка"
      />
      <Checkbox
        id="two"
        checked={twoTransfers}
        value={'twoTransfers'}
        onChange={() => {
          dispatch(setIsChecked('twoTransfers'));
        }}
        text="2 пересадки"
      />
      <Checkbox
        id="three"
        checked={threeTransfers}
        value={'threeTransfers'}
        onChange={() => {
          dispatch(setIsChecked('threeTransfers'));
        }}
        text="3 пересадки"
      />
    </aside>
  );
}

export default MenuFilterTicket;
