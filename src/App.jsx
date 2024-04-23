import classes from './App.module.scss';
import img from './images/Logo.svg';
import { Api } from './redux/fetchRequests';
import { MainContainerListTicket } from './component/ContentMain/MainContainerListTicket';
import { Provider } from 'react-redux';
import { storeAviasales } from './redux/store';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const api = new Api();

function App() {
  const [theme, setTheme] = useState(Cookies.get('theme') || 'light');

  useEffect(() => {
    Cookies.set('theme', theme, { expires: 60000 });
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={classes['aviation-content']}>
      <header className={classes.pictures}>
        <img className={classes.icon} src={img} alt="" />
      </header>
      <Provider store={storeAviasales}>
        <MainContainerListTicket />
      </Provider>
    </div>
  );
}

export default App;
