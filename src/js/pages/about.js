import React, { Component } from 'react';
import {
    Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col,
    Jumbotron, InputGroup, Input, InputGroupAddon,} from 'reactstrap';

class About extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                this is the about page.
            </div>
        );
    }
}

export default About;