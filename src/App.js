import logo from './logo.svg';
import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Routes from './configs/routes';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './redux/store';

function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
          <Route 
            render = {props => (
              <div className = 'App'>
                  <Routes />
              </div>
            )}
          />
        </BrowserRouter>
    </Provider>
  );
}

export default App;
