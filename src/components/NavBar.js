// src/components/NavBar.js

import React, { Component } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link, Redirect } from "react-router-dom";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false
        }

    }
    componentDidMount() {
        const cachedToken = localStorage.getItem('user_token')
        if (cachedToken) {
            this.setState({ logged: true });
        }
    }
    login() {
        let path = '/login'
        this.props.history.push(path);
    }
    logout() {
        localStorage.clear();
    }

    render() {
        if (this.state.logged === false) {
            return (
                <div>
                    <button className="archive styled"
                        type="button">
                        <Link to={'/login'} >Login</Link>
                    </button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <button onClick={e => this.logout(e)} className="archive styled"
                        type="button">
                        <Link to={'/'} >Logout</Link>
                    </button>
                </div>
            )
        }
    }


}
export default Navbar