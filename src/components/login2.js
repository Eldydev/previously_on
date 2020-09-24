import React, { Component } from "react";
import queryString from 'query-string';
import { Redirect } from "react-router-dom";

class login2 extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        let code = params.code
        console.log(code)
        fetch('https://api.betaseries.com/oauth/access_token', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: '195bb87bcdc5',
                client_secret: 'fae54dfbb0bee6ab35065b5488a39c14',
                redirect_uri: 'http://localhost:3000/login2',
                code: 'eef8fab09d51c40b6ae3b6063a8d2dd4'

            })
        })
            .then(res => res.json())

            .catch(error => console.error('Error: ', error))

            .then(response => {
                console.log('Success: ', response)
                localStorage.setItem('user_token', JSON.stringify(response.access_token))
            });
        setTimeout(() => this.props.history.push("/home"), 500);
    }
    render() {
        return (
            <div>Bonjour</div>
        )

    }
}
export default login2