import { Route, BrowserRouter, Switch} from 'react-router-dom'
import React from 'react';

import Login from './pages/Logon';
import Schedule from './pages/Schedule';
import ScheduleDetails from './pages/ScheduleDetails';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Service from  './pages/ServicesProfile';
import User from  './pages/User';
import ForgotPass from './pages/ForgotPassword';
// import Main from  './pages/Main';
// import Footer from './pages/Footer';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/forgot-password" component={ForgotPass}/>
                <Route path="/schedule" component={Schedule}/>
                <Route path="/schedule-details" component={ScheduleDetails}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/register" component={Register}/>
                <Route path="/service" component={Service}/>
                <Route path="/user" component={User}/>
                {/* <Route path="/main" component={Main}/>
                <Route path="/footer" component={Footer}/> */}
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;