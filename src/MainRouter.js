import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import Profile from './user/Profile';
import Users from './user/Users';

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/user/:userId" component={Profile} />
        </Switch>
    </div>
)

export default MainRouter;