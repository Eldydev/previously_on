import React, { Component } from "react";
import history from "../utils/history";

class login extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        fetch('https://www.betaseries.com/authorize?client_id=195bb87bcdc5&redirect_uri=http://localhost:3000/login2')
            .then(response => window.location.href = response.url)
    }
    render() {
        return (
            <div>hello</div>
        )

    }
}
export default login