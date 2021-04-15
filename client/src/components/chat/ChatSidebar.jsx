
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import SidebarUser from './SidebarUser';

class ChatSidebar extends React.Component {
    constructor(props) {
        super(props);

        const {
            users
        } = this.props;

        this.state = {
            // a list of Users that this one currently has messages with
            users: users
        }
    }

    render() {

        return (
            <Button disabled block className="pb-3" variant="outline-info">
                <Container className="mt-4" fluid>
                    {this.state.users.map((u) => <SidebarUser user={u} currMessaging={this.props.currMessaging}/>)}
                </Container>
            </Button>
        )
    }
}

export default ChatSidebar;