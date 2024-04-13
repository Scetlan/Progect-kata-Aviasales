import classes from './Button.module.scss';

function HeaderBtn() {
  return (
    <header className={classes['price-segment']}>
      <ul className={classes['link__btn-price']}>
        <li className="link__cheap">
          <button type="button" className={`${classes.link__btn} ${classes.cheap}`}>
            Самый дешевый
          </button>
        </li>
        <li className="link__fast">
          <button type="button" className={classes.link__btn}>
            Самый быстрый
          </button>
        </li>
        <li className="link__optimal">
          <button type="button" className={`${classes.link__btn} ${classes.optimal}`}>
            Оптимальный
          </button>
        </li>
      </ul>
    </header>
  );
}

export default HeaderBtn;
