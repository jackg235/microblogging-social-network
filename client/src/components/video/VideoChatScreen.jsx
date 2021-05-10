import React from 'react'
import {
    AppBar,
    Backdrop,
    CircularProgress,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    List,
    TextField,
    Toolbar,
    Typography,
} from "@material-ui/core";
import {Send} from "@material-ui/icons";
import VideoChatItem from "./VideoChatItem";
import {connect} from "react-redux";
import RouteProtector from "../../hoc/RouteProtector";

const Chat = require("twilio-chat");

class VideoChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            messages: [],
            loading: false,
            room: props.roomName,
            token: props.token,
            channel: "",
            client: props.client
        };
        this.scrollDiv = React.createRef();
    }

    componentDidMount = async () => {
        const token = this.state.token
        const client = this.state.client

        client.on("channelJoined", async (channel) => {
            // getting list of all messages since this is an existing channel
            const messages = await channel.getMessages();
            this.setState({messages: messages.items || []});
        });
        const room = this.state.room
        try {
            const channel = await client.getChannelByUniqueName(room);
            await this.joinChannel(channel);
            this.setState({channel, loading: false});
        } catch {
            try {
                const channel = await client.createChannel({
                    uniqueName: room,
                    friendlyName: room,
                });
                await this.joinChannel(channel);
                this.setState({channel, loading: false});
            } catch {
                throw new Error("unable to create channel, please reload this page");
            }
        }
    };

    joinChannel = async (channel) => {
        if (channel.channelState.status !== "joined") {
            await channel.join();
        }

        this.setState({
            channel: channel,
            loading: false
        });

        channel.on("messageAdded", this.handleMessageAdded);
        this.scrollToBottom();
    };


    handleMessageAdded = (message) => {
        const {messages} = this.state;
        this.setState({
                messages: [...messages, message],
            },
            this.scrollToBottom
        );
    };

    scrollToBottom = () => {
        const scrollHeight = this.scrollDiv.current.scrollHeight;
        const height = this.scrollDiv.current.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    };

    sendMessage = () => {
        const {text, channel} = this.state;
        if (text) {
            this.setState({loading: true});
            channel.sendMessage(String(text).trim());
            this.setState({text: "", loading: false});
        }
    };


    render() {
        const {loading, text, messages, channel, room} = this.state;
        const email = this.props.auth.email
        return (
            <Container component="main" maxWidth="md">
                <Backdrop open={loading} style={{zIndex: 99999}}>
                    <CircularProgress style={{color: "white"}}/>
                </Backdrop>


                <CssBaseline/>

                <Grid container direction="column" style={styles.mainGrid}>
                    <Grid item style={styles.gridItemChatList} ref={this.scrollDiv}>
                        <List dense={true}>
                            {messages &&
                            messages.map((message) =>
                                <VideoChatItem
                                    key={message.index}
                                    message={message}
                                    email={email}/>
                            )}
                        </List>
                    </Grid>

                    <Grid item style={styles.gridItemMessage}>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Grid item style={styles.textFieldContainer}>
                                <TextField
                                    required
                                    style={styles.textField}
                                    placeholder="Enter message"
                                    variant="outlined"
                                    multiline
                                    rows={2}
                                    value={text}
                                    disabled={!channel}
                                    onChange={(event) =>
                                        this.setState({text: event.target.value})
                                    }/>
                            </Grid>

                            <Grid item>
                                <IconButton
                                    style={styles.sendButton}
                                    onClick={this.sendMessage}
                                    disabled={!channel}>
                                    <Send style={styles.sendIcon}/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

const styles = {
    textField: {width: "100%", borderWidth: 0, borderColor: "transparent"},
    textFieldContainer: {flex: 1, marginRight: 12},
    gridItem: {paddingTop: 12, paddingBottom: 12},
    gridItemChatList: {overflow: "auto", height: "70vh"},
    gridItemMessage: {marginTop: 12, marginBottom: 12},
    sendButton: {backgroundColor: "#3f51b5"},
    sendIcon: {color: "white"},
    mainGrid: {paddingTop: 100, borderWidth: 1},
};

const mapStateToProps = (state) => ({
    auth: state.auth,
})

const VideoChatScreenConnected = connect(mapStateToProps)(VideoChatScreen)
export default RouteProtector(VideoChatScreenConnected)