
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const styles = {
    button: {
        // "text-align": "left"
    }
}

class StreamWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button disabled block className="pb-3" variant="outline-info">Your Stream
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

export default StreamWindow;