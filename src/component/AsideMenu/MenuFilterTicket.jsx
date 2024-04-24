import { useDispatch, useSelector } from 'react-redux';
import classes from './MenuFilterTicket.module.scss';
import Checkbox from '../wrapperComponents/Checkbox';
import { ticketsActions } from '../../redux/reducer/ticketsSlice';

function MenuFilterTicket() {
  const dispatch = useDispatch();
  const stateFetch = useSelector(state => state.tickets);

  const { setIsChecked } = ticketsActions;

  const { all, noneTransfers, oneTransfers, twoTransfers, thirdTransfers } =
    stateFetch.stateCheckBox;
  return (
    <aside className={classes.content__menu}>
      <div className={classes['content__menu-container']}>
        <h1 className={classes.content__title}>Количество пересадок</h1>
        <Checkbox
          id="all"
          checked={all}
          value="all"
          onChange={() => {
            dispatch(setIsChecked('all'));
          }}
          text="Все"
        />
        <Checkbox
          id="off"
          checked={noneTransfers}
          value="noneTransfers"
          onChange={() => {
            dispatch(setIsChecked('all'));
          }}
          text="Без пересадок"
        />
        <Checkbox
          id="one"
          checked={oneTransfers}
          value="oneTransfers"
          onChange={() => {
            dispatch(setIsChecked('all'));
          }}
          text="1 пересадка"
        />
        <Checkbox
          id="two"
          checked={twoTransfers}
          value="twoTransfers"
          onChange={() => {
            dispatch(setIsChecked('all'));
          }}
          text="2 пересадки"
        />
        <Checkbox
          id="three"
          checked={thirdTransfers}
          value="thirdTransfers"
          onChange={() => {
            dispatch(setIsChecked('all'));
          }}
          text="3 пересадки"
        />
      </div>
    </aside>
  );
}

export default MenuFilterTicket;
