import React, { Component } from 'react';
import MemberSeries from "./MemberSeries";
import { Redirect, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../App.css';


class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            redirect: false
        }

    }
    render() {
        return (
            <div>
                <MemberSeries />
                <p>{this.state.token}</p>
            </div>
        );
    }
}

export default Popup;