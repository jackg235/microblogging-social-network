
import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

const styles = {
    img: {
        'minWidth': '80%',
        'minHeight': '80%',
        'height': 'auto',
        'width': '1.75vmax'
    },
}

class SidebarUser extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.currMessaging(this.props.user);
    }

    render() {
        return (
            <Row className="flex-nowrap overflow-hidden">
                <Col xs={3}>
                    <Image className="" style={styles.img} src={''} rounded />
                </Col>
                <Col xs={8}>
                    <Button disabled={this.props.disabled} onClick={this.onClick} block className="mb-2 overflow-hidden" variant="outline-info">
                        {this.props.user}
                    </Button>
                </Col>
            </Row>
        )
    }
}

export default SidebarUser;
