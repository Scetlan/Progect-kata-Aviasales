import classNames from 'classnames';
import classes from './Button.module.scss';

function ButtonSortTicket({ type, children, ...props }) {
  return (
    <button
      {...props}
      type="button"
      className={classNames(classes.link__btn, {
        [classes.activeType]: type === 'active',
      })}
    >
      {children}
    </button>
  );
}

export default ButtonSortTicket;
