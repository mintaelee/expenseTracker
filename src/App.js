import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import './App.css';

const Home = React.lazy(() => import('./components/pages/Home'))
const Calendar = React.lazy(() => import('./components/Calendar/Calendar'))
const Category = React.lazy(() => import('./components/Category/Category'))
const File = React.lazy(() => import('./components/File/File'))
const Summary = React.lazy(() => import('./components/Summary/Summary'))

function App() {

  return (
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <PrivateRoute exact path='/calendar' component={Calendar} />
        <PrivateRoute exact path='/category' component={Category} />
        <PrivateRoute exact path='/upload-file' component={File} />
        <PrivateRoute exact path='/summary' component={Summary} />
      </Switch>
    </>
  );
}

export default App;
