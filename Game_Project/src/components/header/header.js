import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import logo from '../../assest/images/logo.svg';

class Header extends Component{

    render(){
        return (
            <Navbar bg="primary" variant="dark" fixed="top">
                <Navbar.Brand href="/">
                    <img src={logo} alt="" height="30px" />
                </Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="/">HOME</Nav.Link>
                <Nav.Link href="/gameList">GAME LIST</Nav.Link>
                <Nav.Link href="/generate">GENERATE</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;