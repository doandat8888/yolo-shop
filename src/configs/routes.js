import React from 'react'

import { Switch, Route } from 'react-router';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import ProductView from '../components/ProductView';
import ProductDetail from '../components/ProductDetail';
import Cart from '../pages/Cart';
import LoginPage from '../pages/Login';
import AdminPage from '../pages/Admin';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/catalog" exact component={Catalog}/>
            <Route path="/admin" exact component={LoginPage}/>
            <Route path="/admin-login-success" exact component={AdminPage} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/:slug" component={ProductDetail} />
        </Switch>
    )
}

export default Routes;