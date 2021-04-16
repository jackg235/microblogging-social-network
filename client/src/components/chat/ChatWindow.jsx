
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const styles = {
    button: {
        "text-align": "left"
    }
}

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };

        this.onClick = this.onClick.bind(this);
    }

    getChannel(cli) {
        console.log(cli);
        return cli.getChannelByUniqueName(`${this.props.current.email}:${this.props.getMe()}`).then(room => {
            console.log(room);
            return room;
        }).catch(e => {
            return cli.getChannelByUniqueName(`${this.props.getMe()}:${this.props.current.email}`).then(room => {
                console.log(room);
                return room;
            }).catch(e => {
                // Make new channel
                return cli.createChannel(
                    {
                        uniqueName: `${this.props.getMe()}:${this.props.current.email}`,
                        friendlyName: `${this.props.getMe()}:${this.props.current.email}`,
                    }
                ).then(room => {
                    console.log(room);
                    return room;
                }).catch(e => {
                    console.log('error making or finding channels...');
                });
            });
        });
    }

    handleMessageAdded(message) {
        const { messages } = this.state;
        this.setState(prevState => {
            return {
                messages: [...messages, message],
            }
        });
    }


    componentDidUpdate(prevProps) {
        console.log('yoooooooo?');
        if (prevProps.current !== this.props.current) {

            // event listener
            this.props.client.on('channelJoined', (channel) => {
                channel.getMessages().then(messages => {
                    this.setState(prevState => {
                        return {
                            messages: messages.items || [],
                        }
                    });
                })
            });

            const email = this.props.current.email;

            console.log('state', JSON.stringify(this.state));

            this.getChannel(this.props.client).then((channel) => {
                console.log('here', channel);
                channel.on('messageAdded', this.handleMessageAdded);
                if (channel.channelState.status !== 'joined') {
                    channel.join().then(() => {
                        this.setState(prevState => {
                            console.log('32898');
                            return {
                                current: this.props.current,
                                channel: channel,
                            }
                        });
                    }).catch(e => {
                        console.log('error joining channel');
                    });
                } else {
                    this.setState(prevState => {
                        return {
                            current: this.props.current,
                            channel: channel
                        }
                    });
                }
            }).catch(e => {
                console.log('222');
                alert(e, 'error getting channel');
            });
        }
    }

    onClick() {
        console.log(this.props.client);
        console.log(this.state.current);
        console.log(this.state.messages);
        console.log(this.state.channel);
    }

    render() {
        const userTo = this.props.current !== undefined ? this.props.current.username : '';
        return (
            <Button style={styles.button} disabled block className="pb-3" variant="outline-info">{userTo}
                <Container className="mt-4" fluid>
                    <Row>
                    <Button onClick={this.onClick} block className="mb-2 mx-2" variant="outline-info">Message1</Button>
                    </Row>
                    <Row>
                    <Button block className="mb-2 mx-2" variant="outline-info">Message2</Button>
                    </Row>
                </Container>
            </Button>
        )
    }
}

export default ChatWindow;