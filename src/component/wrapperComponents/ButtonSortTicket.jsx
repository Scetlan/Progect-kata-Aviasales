import classes from './Button.module.scss';
import classNames from 'classnames';

function ButtonSortTicket({ type, children, id = null, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      // id={classes}
      className={classNames(classes.id, classes.link__btn, {
        [classes.activeType]: type === 'active',
        [classes.cheap]: id === 'one' ? 'cheap' : '',
        [classes.optimal]: id === 'three' ? 'optimal' : '',
      })}
    >
      {children}
    </button>
  );
}

export default ButtonSortTicket;
