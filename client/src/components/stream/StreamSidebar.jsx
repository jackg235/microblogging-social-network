
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

class StreamSidebar extends React.Component {
    constructor(props) {
        super(props);

        const {classes} = this.props;
        console.log('hiiiiii', classes);

    }

    render() {
        return (
            <Button disabled block className="pb-3" variant="outline-info">Streams
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

export default StreamSidebar;