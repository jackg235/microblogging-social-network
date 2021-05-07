import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ChatMessage from './ChatMessage';
import Form from 'react-bootstrap/Form';
import { getChatClient, getChannel, getFirstMessages, getMoreMessages, sortByIndex } from "./TwilioUtils";
import InfiniteScroll from "react-infinite-scroll-component";
import Recorder from './Recorder';

const styles = {
    button: {
        "padding-top": "4%",
        "padding-left": "2%",
        "padding-right": "2%",
        "margin-bottom": "6%"
        // "text-align": "left",
        // "overflow-y": "scroll",
        // "overflow-x": "hidden",
        // "max-height": "75vh"
    },
    form: {
        "width": "100%",
    }
}

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            hasMore: true,
            audio: ''
        };

        this.onClick = this.onClick.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleMessageAdded = this.handleMessageAdded.bind(this);
    }

    handleMessageAdded(message) {
        const { messages } = this.state;
        const newmsgs = [...messages, message]
        this.setState(prevState => {
            return { messages: sortByIndex(newmsgs) }
        });
        this.scrollToBottom();
    }

    // get the client once
    componentDidMount() {
        getChatClient(this.props.email).then(client => {
            this.setState({ client: client });
        }).catch(err => console.log(err));
    }

    componentDidUpdate(prevProps) {
        let ch;
        if (prevProps.current !== this.props.current) {
            const email = this.props.current.email;

            getChannel(this.state.client, this.props.email, this.props.current.email).then(channel => {
                ch = channel;
                if (channel._events.messageAdded.length !== 2) {
                    channel.on('messageAdded', this.handleMessageAdded);
                }

                if (channel.channelState.status !== 'joined') {
                    channel.join().catch(e => {
                        console.log('error joining channel');
                    });
                } else {
                }
                return getMoreMessages(channel, -1, 10);
            }).then(firstPage => {
                this.setState(prevState => {
                    return {
                        current: this.props.current,
                        channel: ch,
                        messages: firstPage || [],
                        hasMore: true
                    }
                });
            }).catch(e => {
                window.location.reload();
            });
        }
        // don't need for inf
        // this.scrollToBottom();
    }

    // debugging purposes
    onClick() {
        console.log('client', this.state.client);
        console.log('current',this.state.current);
        console.log('messages',this.state.messages);
        console.log('channel',this.state.channel);
    }

    // send button onClick
    sendMessage() {
        const channel = this.state.channel;

        // send image
        const fileTag = document.getElementById('file');
        const file = fileTag.files.length > 0 ? fileTag.files[0] : null;
        if (file !== null) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                channel.sendMessage({
                    contentType: file.type,
                    media: reader.result
                })
            });
            reader.readAsArrayBuffer(file);
        }
        // send audio file
        if (this.state.audio !== '') {
            const file = this.state.audio;
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                channel.sendMessage({
                    contentType: file.type,
                    media: reader.result
                });
            });
            reader.readAsArrayBuffer(file);
            this.setState({ audio: '' });
        }
        // send text
        const input = document.getElementById('send-inpt').value.trim();
        if (input !== '') {
            document.getElementById('send-inpt').value = '';
            document.getElementById('send-inpt').focus();
            channel.sendMessage(input);
            setTimeout(this.fetchMoreMessages(), 2000);
        }
    }

    // scroll down on component update
    scrollToBottom = () => {
        document.getElementById('dummy').scrollIntoView({ behavior: "smooth" });
    }

    handleKeyDown = (ev) => {
        if (ev.keyCode === 13) {
            ev.preventDefault();
            this.sendMessage();
        }
    }

    fetchMoreMessages = () => {
        const curr = this.state.messages;

        if (curr.length === 0) {
            return;
        }

        const latestIdx = curr[curr.length - 1].index;
        getMoreMessages(this.state.channel, latestIdx, 10)
            .then(newmsgs => {
                if (newmsgs === null) {
                    this.setState({ hasMore: false });
                } else {
                    this.setState({ messages: this.state.messages.concat(newmsgs) });
                }
            })
            .catch(e => console.log(e));
    };

    // sets state from child's audio
    getAudio = (blob) => {
        this.setState({ audio: blob });
    }

    render() {
        const userTo = this.props.current !== undefined ? this.props.current.username : '';
        const sendingStyle = {
            span: 5
        }
        const receiveStyle = {
            span: 5,
            offset: 7
        }

        const messageComps = this.state.messages.length !== 0 ? this.state.messages.map((message) => {
            const author = message.state.author;
            const styling = author.trim().toLowerCase() === this.props.email.trim().toLowerCase() ? sendingStyle : receiveStyle;
            // const styling = author.trim().toLowerCase() === this.props.email.trim().toLowerCase() ? receiveStyle : sendingStyle;
            return (
                <Row key={message.sid}>
                    <Col xs={styling}>
                        <ChatMessage message={message} />
                    </Col>
                </Row>
            )
        }): '';

        const sendMessageComponent = this.state.channel !== undefined ?
            <Row className="mt-2">
                {/* <input type="hidden" value="something"/> */}
                <Col xs={7}>
                    <Form className="mb-1">
                        <Form.Group>
                            <Form.Control autoComplete="off" onKeyDown={this.handleKeyDown} style={styles.form} id="send-inpt" placeholder="Enter message" />
                        </Form.Group>
                    </Form>
                </Col>
                <Col xs={1}>
                    <Button onClick={this.sendMessage} variant="primary">Send</Button>
                </Col>
                <Col xs={4}>
                    <Recorder newAudio={this.getAudio}/>
                </Col>
            </Row> : '';

        const infScroll = <InfiniteScroll
            style = {{
                "overflowX": "hidden"
            }}
            dataLength={this.state.messages.length}
            next={this.fetchMoreMessages}
            hasMore={this.state.hasMore}
            // loader={<h4>Loading...</h4>}
            // endMessage={ <p style={{ textAlign: "center" }}> <b>No more messages</b> </p> } 
            >

            {messageComps}
        </InfiniteScroll>;

        return (
            <Button style={styles.button} disabled block className="" variant="outline-info">
                {/* <Container className="mt-4" fluid>
                    <Row>
                        <Button onClick={this.onClick} block className="mb-2 mx-2" variant="outline-info">Click to print this.state to console</Button>
                    </Row>
                </Container> */}

                {infScroll}
                
                {sendMessageComponent}
                <input id="file" type="file" onChange={ev => console.log(ev.target.files)} />
                {/* used to scroll to the bottom on new message received */}
                <div style={{ float:"left", clear: "both" }} id="dummy" />
            </Button>
        );
    }
}

export default ChatWindow;
