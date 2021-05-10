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
import { getContacts, getBlockedUsers } from '../slices/actions/AuthenticationActions';
import { getChatClient, getChannel, getMoreMessages, sortByIndex, getAllChannelsContainingUser } from "./chat/TwilioUtils";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            gotContacts: false,
        }
        this.updateChatWindow = this.updateChatWindow.bind(this);
    }

    componentDidMount() {
        this.props.retrieveContacts(this.props.auth.username);
        this.props.getBlocks(this.props.auth.username);
        getChatClient(this.props.auth.username).then(client => {
            this.setState({ client: client });
        });
    }

    updateChatWindow(user) {
        this.setState({ current: user });
        getChannel(this.state.client, this.props.auth.username, user).then(channel => {
            if (channel.channelState.status !== 'joined') {
                channel.join().catch(e => {
                    console.log('error joining channel');
                });
            }
            this.setState({ channel: channel });
        })
        .catch(e => {
            console.log(e);
            // window.location.reload();
        });
    }

    updateContacts = (contacts) => {
        this.setState({ contacts: contacts });
        console.log('contacts', contacts);
    }

    componentDidUpdate() {
        if (!this.state.gotContacts && this.state.client !== undefined) {
            getAllChannelsContainingUser(this.state.client, this.props.auth)
            .then(contacts => this.setState({ contacts: contacts, gotContacts: true }));
        }
    }

    render() {
        const { authenticated, username} = this.props.auth;

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
                        <Col xs={3}>
                            <ChatSidebar users={this.state.contacts} current={this.state.current} auth={this.props.auth} currMessaging={this.updateChatWindow}/>
                        </Col>
                        <Col>
                            <ChatWindow client={this.state.client} channel={this.state.channel} current={this.state.current} uniqueId={username}/>
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
        getBlocks: (username) => dispatch(getBlockedUsers(username))
    })
}

const ChatConnected = connect(mapStateToProps, mapDispatchToProps)(Chat);
export default RouteProtector(ChatConnected);
