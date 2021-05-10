
import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import SidebarUser from './SidebarUser';

class ChatSidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.users === undefined) {
            return null;
        } else {
            return (
                <Button disabled block className="pb-3" variant="outline-info"><p></p>
                    <Container className="mt-4" fluid>
                        {this.props.users.map((u, index) => {
                            const disabled = u === this.props.current;
                            return <SidebarUser disabled={disabled} key={index} user={u} currMessaging={this.props.currMessaging}/>
                        })}
                    </Container>
                </Button>
            )
        }
    }
}

export default ChatSidebar;
