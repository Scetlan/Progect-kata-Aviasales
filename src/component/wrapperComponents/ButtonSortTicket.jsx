import classNames from 'classnames';
import classes from './Button.module.scss';

function ButtonSortTicket({ type, children, id = null, ...props }) {
  return (
    <button
      {...props}
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
