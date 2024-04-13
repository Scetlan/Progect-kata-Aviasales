import classes from './AsideMenu.module.scss';

function AsideMenu() {
  return (
    <aside className={classes.content__menu}>
      <h2 className={classes.content__title}>Количество пересадок</h2>
      <div className={classes.content__transfer}>
        <input className="content__checkbox-item" type="checkbox" name="transfer-all" />
        <span className={classes.text}>Все</span>
      </div>
      <div className={classes.content__transfer}>
        <input className="content__checkbox-item" type="checkbox" name="no-transfer" />
        <span className={classes.text}>Без пересадок</span>
      </div>
      <div className={classes.content__transfer}>
        <input className="content__checkbox-item" type="checkbox" name="transfer-one" />
        <span className={classes.text}>1 пересадка</span>
      </div>
      <div className={classes.content__transfer}>
        <input className="content__checkbox-item" type="checkbox" name="transfer-two" />
        <span className={classes.text}>2 пересадки</span>
      </div>
      <div className={classes.content__transfer}>
        <input className="content__checkbox-item" type="checkbox" name="transfer-three" />
        <span className={classes.text}>3 пересадки</span>
      </div>
    </aside>
  );
}

export default AsideMenu;
