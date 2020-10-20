import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import axiosDefault from './services/httpService';
import './styles/App.scss';


import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import TodoPage from "./pages/TodoPage";
import Users from './pages/Users';

function App(props: any) {

    axiosDefault();

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
            <Switch>
                <Route  path={'/profile'} component={Profile} />
                <Route  path={'/users'} component={Users} />
                <Route path={'/todos'} component={TodoPage} />
                <Route  path={'/register'} component={Register} />
                <Route  path={'/login'} component={Login}/>
                <Route  path={'/logout'} component={Logout}/>
                <Route exact path={'/'} component={Home} />
            </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
