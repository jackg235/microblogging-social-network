import React from 'react';
import {connect} from 'react-redux';
import RouteProtector from '../hoc/RouteProtector';
import {logout} from '../slices/actions/AuthenticationActions';
import {Redirect} from 'react-router-dom';
import Navbar from './Navbar';
import DefaultProPic from '../default_propic.jpg';
import User from './user/User';
import ExploreCol from './explore/ExploreCol';
import TextField from '@material-ui/core/TextField';
import { Divider, Grid } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import '../static/stylesheets/Stream.css';
import Card from 'react-bootstrap/Card';
import StreamSidebar from './stream/StreamSidebar';
import StreamWindow from './stream/StreamWindow'

class Stream extends React.Component {
    constructor(props) {
        super(props);
        this.logoutClick = this.logoutClick.bind(this);

        this.state = {
            watching: 0
        }
    }

    logoutClick() {
        this.props.logoutUser();
    }

    render() {
        // if (!this.props.authenticated) {
        //     return <Redirect to='/'/>
        // }

        return (
            <div>
                <Navbar/>
                <Container className="px-5" fluid>
                    <Row>
                        <h1>
                            <Badge className="ml-2 mt-3 mb-5" variant="secondary">Stream</Badge>
                        </h1>
                    </Row>
                    <Row>
                        <Col classname="stream-sidebar" xs={4}>
                            <StreamSidebar/>
                        </Col>
                        <Col classname="stream-sidebar">
                            <StreamWindow/>
                        </Col>
                    </Row>
                </Container>
            </div>      
        )
    }
}

export default Stream;