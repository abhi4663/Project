import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Notes from '../src/components/Notes';
import Register from '../src/components/Register';
import Login from '../src/components/Login';
import { NoteProvider } from './reducer/useContext';
import './components/style.css';
import store from './redux-reducer/redux-store'
import { Provider } from 'react-redux'

function App() {


  return (
    <>
      <Provider store={store}>
        <NoteProvider>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path='/notes' component={Notes} />
              <Route exact path='/register'>
                <Register></Register>
              </Route>
              <Route exact path='/'>
                <Login></Login>
              </Route>
            </Switch>
          </Router>
        </NoteProvider>
      </Provider>
    </>
  );
}

export default App;

