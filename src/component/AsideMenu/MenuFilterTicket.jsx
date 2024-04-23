import { useDispatch, useSelector } from 'react-redux';
import classes from './MenuFilterTicket.module.scss';
import { ticketsActions } from '../../redux/reducer/ticketsSlice';
import { useEffect } from 'react';
import Checkbox from '../wrapperComponents/Checkbox';

function MenuFilterTicket() {
  const dispatch = useDispatch();

  const checkBoxType = useSelector(state => state.ticketsReducer.stateCheckBox);

  const { disabledAllCheckbox, noneCheckbox, firstCheckbox, secondCheckbox, thirdCheckbox } =
    checkBoxType;

  function updateCheckBox(event) {
    const data = {
      key: event.currentTarget.value,
      isActive: event.currentTarget.checked,
    };
    dispatch(ticketsActions.setCheckBox(data));
  }

  useEffect(() => {
    dispatch(ticketsActions.executeFilter());
    // dispatch(fetchTicketsSort());
  }, [dispatch, checkBoxType]);

  return (
    <aside className={classes.content__menu}>
      <div className={classes['content__menu-container']}>
        <h1 className={classes.content__title}>Количество пересадок</h1>
        <Checkbox
          id="all"
          checked={!disabledAllCheckbox}
          value="allCheckbox"
          onChange={updateCheckBox}
          text="Все"
        />
        <Checkbox
          id="off"
          checked={noneCheckbox}
          value="noneCheckbox"
          onChange={updateCheckBox}
          text="Без пересадок"
        />
        <Checkbox
          id="one"
          checked={firstCheckbox}
          value="firstCheckbox"
          onChange={updateCheckBox}
          text="1 пересадка"
        />
        <Checkbox
          id="two"
          checked={secondCheckbox}
          value="secondCheckbox"
          onChange={updateCheckBox}
          text="2 пересадки"
        />
        <Checkbox
          id="three"
          checked={thirdCheckbox}
          value="thirdCheckbox"
          onChange={updateCheckBox}
          text="3 пересадки"
        />
      </div>
    </aside>
  );
}

export default MenuFilterTicket;
