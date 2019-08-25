import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './scss/app';

import Tasks from './components/public/Tasks';
import Navbar from './components/shared/Navbar';
import OneTask from './components/public/OneTask';
import EditTask from './components/admin/EditTask';
import Login from './components/public/Login';
import Register from './components/public/Register';
import NewTask from './components/admin/NewTask';

const App: React.SFC<AppProps> = () => {
    return (
        <BrowserRouter>
            <main className="container">
                <Navbar/>
                <Switch>
                    <Route exact path='/' component={Tasks} />
                    <Route exact path='/tasks/:id' component={OneTask} />
                    <Route exact path='/edit/:id' component={EditTask} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/newTask' component={NewTask} />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;

export interface AppProps { }




