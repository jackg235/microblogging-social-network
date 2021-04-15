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
import Card from 'react-bootstrap/Card';
import ChatSidebar from './chat/ChatSidebar';
import ChatWindow from './chat/ChatWindow'

const usersMock = [
    {
        userImg: DefaultProPic,
        username: 'user1',
        firstName: 'F1',
        lastName: 'L1',
        regDate: '04/07/21',
        followers: [],
        following: [],
        blocking: [],
        hidden: [],
    },
    {
        userImg: DefaultProPic,
        username: 'user2',
        firstName: 'F2',
        lastName: 'L2',
        regDate: '04/08/21',
        followers: [],
        following: [],
        blocking: [],
        hidden: [],
    },{
        userImg: DefaultProPic,
        username: 'user3',
        firstName: 'F3',
        lastName: 'L3',
        regDate: '04/09/21',
        followers: [],
        following: [],
        blocking: [],
        hidden: [],
    },
    {
        userImg: DefaultProPic,
        username: 'user322r23r4',
        firstName: 'F4',
        lastName: 'L4',
        regDate: '04/10/21',
        followers: [],
        following: [],
        blocking: [],
        hidden: [],
    },
    {
        userImg: DefaultProPic,
        username: 'user5',
        firstName: 'F5',
        lastName: 'L5',
        regDate: '04/11/21',
        followers: [],
        following: [],
        blocking: [],
        hidden: [],
    },
];

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: this.getContactsWithMessages(this.props.auth),
            current: '',
            client: this.getChatClient(this.props.auth)
        }

        this.logoutClick = this.logoutClick.bind(this);
        this.updateChatWindow = this.updateChatWindow.bind(this);
    }

    getChatClient(auth) {
        return null;
    }

    getContactsWithMessages(auth) {
        // return list of users that have messages with auth
        return usersMock;
    }

    // something w redux?
    logoutClick() {
        this.props.logoutUser();
    }

    updateChatWindow(user) {
        this.setState(prevState => {
            return {
                // should I use this or fetch contacts again in case they've changed?
                // contacts: prevState.users,
                contacts: this.getContactsWithMessages(this.props.auth),
                current: user,
                client: prevState.client,
            }
        });
    }

    render() {
        // if (!this.props.auth.authenticated) {
        //     return <Redirect to='/'/>
        // }

        const ChatClient = null;

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
                        <Col classname="stream-sidebar" xs={2}>
                            <ChatSidebar users={this.state.contacts} currMessaging={this.updateChatWindow}/>
                        </Col>
                        <Col classname="stream-sidebar">
                            <ChatWindow current={this.state.current}/>
                        </Col>
                    </Row>
                </Container>
            </div>      
        )
    }
}

// function mapStateToProps(state) {
//     console.log(state.auth)
//     return state.auth
// }

// function mapDispatchToProps(dispatch) {
//     return ({
//         logoutUser: () => dispatch(logout())
//     })
// }

// const ChatConnected = connect(mapStateToProps, mapDispatchToProps)(Chat);
// export default RouteProtector(ChatConnected);

export default Chat;