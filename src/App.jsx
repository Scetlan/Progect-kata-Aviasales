import AsideMenu from './component/AsideMenu/AsideMenu';
import HeaderBtn from './component/ContentMain/HeaderBtn/HeaderBtn';
import Ticket from './component/ContentMain/Ticket/Ticket';
import classes from './App.module.scss';

function App() {
  return (
    <div className={classes['aviation-content']}>
      <section className={classes.pictures}>
        <img className={classes.icon} src="/src/images/Logo.svg" alt="" />
      </section>
      <section className={classes.content}>
        <AsideMenu />
        <main className={classes.content__main}>
          <HeaderBtn />
          <Ticket />
        </main>
      </section>
    </div>
  );
}

export default App;
