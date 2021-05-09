import React from 'react';
import {connect} from 'react-redux';
import RouteProtector from '../hoc/RouteProtector';
import {logout} from '../slices/actions/AuthenticationActions';
import {Redirect} from 'react-router-dom';
import Navbar from './Navbar';
import DefaultProPic from '../default_propic.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import '../static/stylesheets/Stream.css';
import ChatSidebar from './chat/ChatSidebar';
import ChatWindow from './chat/ChatWindow';
import {getContacts} from '../slices/actions/AuthenticationActions'

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: []
        }
        this.updateChatWindow = this.updateChatWindow.bind(this);
    }

    componentDidMount() {
        console.log('auth: ', this.props.auth);
        this.props.retrieveContacts(this.props.auth.username);
    }

    updateChatWindow(user) {
        this.setState({ current: user });
    }

    render() {
        const { email, first, last, authenticated } = this.props.auth;

        if (!authenticated) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <Navbar/>
                <Container className="px-5" fluid>
                    <Row>
                        <h1>
                            <Badge className="ml-2 mt-3 mb-5" variant="secondary">Messages</Badge>
                        </h1>
                    </Row>
                    <Row>
                        <Col classname="stream-sidebar" xs={3}>
                            <ChatSidebar users={this.props.auth.following} currMessaging={this.updateChatWindow}/>
                        </Col>
                        <Col classname="stream-sidebar">
                            <ChatWindow current={this.state.current} email={email}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

function mapDispatchToProps(dispatch) {
    return ({
        logoutUser: () => dispatch(logout()),
        retrieveContacts: (username) => dispatch(getContacts(username)),
    })
}

const ChatConnected = connect(mapStateToProps, mapDispatchToProps)(Chat);
export default RouteProtector(ChatConnected);
