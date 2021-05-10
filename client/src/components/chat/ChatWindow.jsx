import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ChatMessage from './ChatMessage';
import Form from 'react-bootstrap/Form';
import { getChatClient, getChannel, getMoreMessages, sortByIndex, getAllChannelsContainingUser } from "./TwilioUtils";
import InfiniteScroll from "react-infinite-scroll-component";
import Recorder from './Recorder';

const styles = {
    button: {
        "padding-top": "4%",
        "padding-left": "2%",
        "padding-right": "2%",
        "margin-bottom": "6%"
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

        this.sendMessage = this.sendMessage.bind(this);
        this.handleMessageAdded = this.handleMessageAdded.bind(this);
    }

    handleMessageAdded(message) {
        if (this.props.channel.sid === message.channel.sid) {
            const { messages } = this.state;
            const newmsgs = [...messages, message]
            this.setState(prevState => {
                return { messages: sortByIndex(newmsgs) }
            });
            this.scrollToBottom();
        }
    }

    componentDidUpdate(prevProps) {
        let ch;
        if (prevProps.channel !== this.props.channel) {
            if (this.props.channel._events.messageAdded.length !== 2) {
                this.props.channel.on('messageAdded', this.handleMessageAdded);
            }
            getMoreMessages(this.props.channel, -1, 10)
            .then(firstPage => {
                this.setState({
                        messages: firstPage || [],
                        hasMore: true
                });
            }).catch(e => {
                console.log(e);
                // window.location.reload();
            });
        }
    }

    sendMessage() {
        const channel = this.props.channel;

        // send image
        const fileTag = document.getElementById('file');
        const file = fileTag.files.length > 0 ? fileTag.files[0] : null;
        if (file !== null) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                channel.sendMessage({
                    contentType: file.type,
                    media: reader.result
                }).catch(e => {});
                // clears the input file
                fileTag.value = '';
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
                }).catch(e => {});
            });
            reader.readAsArrayBuffer(file);
            this.setState({ audio: '' });
        }
        // send text
        const input = document.getElementById('send-inpt').value.trim();
        if (input !== '') {
            document.getElementById('send-inpt').value = '';
            document.getElementById('send-inpt').focus();
            channel.sendMessage(input).catch(e => {});
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
        getMoreMessages(this.props.channel, latestIdx, 10)
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
            const styling = author.trim().toLowerCase() === this.props.uniqueId.trim().toLowerCase() ? receiveStyle : sendingStyle;
            return (
                <Row key={message.sid}>
                    <Col xs={styling}>
                        <ChatMessage message={message} />
                    </Col>
                </Row>
            )
        }): '';

        const sendMessageComponent = this.props.channel !== undefined ?
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
                    <Row>
                        <Col xs={12}>
                            <Recorder newAudio={this.getAudio}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <div className="input-group">
                            <div className="custom-file">
                                <input
                                type="file"
                                className="custom-file-input"
                                id="file"
                                />
                                <label className="custom-file-label">
                                Image/Video Upload
                                </label>
                            </div>
                        </div>
                        </Col>
                    </Row>
                </Col>
            </Row> : '';

        const infScroll = <InfiniteScroll
            style = {{
                "overflowX": "hidden",
                "padding-right": "1%"
            }}
            dataLength={this.state.messages.length}
            next={this.fetchMoreMessages}
            hasMore={this.state.hasMore}
            >
            {messageComps}
        </InfiniteScroll>;

        return (
            <Button style={styles.button} disabled block className="" variant="outline-info">
                {infScroll}
                {sendMessageComponent}
                {/* {fileUpload} */}
                <div style={{ float:"left", clear: "both" }} id="dummy" />
            </Button>
        );
    }
}

export default ChatWindow;
