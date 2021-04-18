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
import ChatWindow from './chat/ChatWindow';


const usersMock = [
    {
        userImg: DefaultProPic,
        email: '1@gmail.com',
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
        email: '2@gmail.com',
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
        email: '3@gmail.com',
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
        email: '4@gmail.com',
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
        email: '5@gmail.com',
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
            contacts: []
        }
        this.logoutClick = this.logoutClick.bind(this);
        this.updateChatWindow = this.updateChatWindow.bind(this);
    }

    // renewTokensAsNeeded = (client) => {
    //     client.on('tokenAboutToExpire', () => {
    //         this.getToken().then(token => {
    //             client.updateToken(token);
    //         });
    //     });

    //     client.on('tokenExpired', () => {
    //         this.getToken().then(token => {
    //             client.updateToken(token);
    //         });
    //     });
    // };

    // getTwilioChatClient(token) {
    //     return TwilioChat.Client.create(token).then(client => {
    //         // console.log(client);

    //         this.renewTokensAsNeeded(client);
    //         // this.setState(prevState => {
    //         //     return { client: client }
    //         // });
    //         return client;
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }

    // getToken() {
    //     // const identity = this.props.auth.email;
    //     const identity = 'b@gmail.com';
    //     const token = axios.get('http://localhost:5000/universal/token', {params: { identity: identity }})
    //         .then(res => res.data.token)
    //         .catch(error => {
    //         if (error.response) {
    //             // Request made and server responded
    //             console.log(error.response.data);
    //             console.log(error.response.status);
    //             console.log(error.response.headers);
    //         } else if (error.request) {
    //             // The request was made but no response was received
    //             console.log(error.request);
    //         } else {
    //             // Something happened in setting up the request that triggered an Error
    //             console.log('Error', error.message);
    //         }
    //     });
    //     return token;
    // }

    getIdentity = () => {
        return 'b@gmail.com';
        // return this.props.auth.email;
    };

    deleteConvo = (email) => {
        
    }

    getContactsWithMessages(auth) {
        // return list of users that have messages with auth
        return usersMock;
    }

    componentDidMount() {
        console.log('main mounted');
        this.setState({ contacts: this.getContactsWithMessages(this.props.auth)});
    }


    // something w redux?
    logoutClick() {
        this.props.logoutUser();
    }

    updateChatWindow(user) {
        this.setState({ current: user });
    }

    render() {
        // if (!this.props.auth.authenticated) {
        //     return <Redirect to='/'/>
        // }
        console.log('rerender');
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
                            <ChatWindow current={this.state.current} email={this.getIdentity()}/>
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