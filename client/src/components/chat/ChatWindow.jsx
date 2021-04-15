
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

    }

    render() {
        const userTo = this.props.current !== '' ? this.props.current.username : '';

        return (
            <Button style={styles.button} disabled block className="pb-3" variant="outline-info">{userTo}
                <Container className="mt-4" fluid>
                    <Row>
                    <Button block className="mb-2 mx-2" variant="outline-info">Person1</Button>
                    </Row>
                    <Row>
                    <Button block className="mb-2 mx-2" variant="outline-info">Person1</Button>
                    </Row>
                </Container>
            </Button>
        )
    }
}

export default ChatWindow;