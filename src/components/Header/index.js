import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { getAvailableTables } from '../../api';
import humanizeString from'humanize-string';

class NavbarHeader extends Component {
    state = {
        availableTables: []
    }

    componentDidMount() {
        getAvailableTables()
            .then(tables => this.setState({availableTables: tables}));
    }

    render() {
        const { availableTables } = this.state;

        return (
            <Navbar>
                { availableTables.map((link, index) => (
                    <Navbar.Text key={index}>
                        <Link to={`/table/${link}`} key={index} className="link">
                            {humanizeString(link)}
                        </Link>
                    </Navbar.Text>
                ))}
            </Navbar>
        );
    }
}

export default NavbarHeader;