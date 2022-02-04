import React, { Component } from 'react';
import "./App.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import UserMng from "./components/userMng";
import ProdMng from "./components/productMng";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/product/" component={ProdMng} />
                        <Route path="/user/" component={UserMng} />
                    </Switch>
            </BrowserRouter>
        );
    }
}

export default App;