import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div className="App-header">
                <div className="App-logo">
                    <Link to="/" className="logo-link">
                        Reservation App
                    </Link>
                </div>
            </div>
        )
    }
}

export default Header;
