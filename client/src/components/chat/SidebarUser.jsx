
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

const styles = {
    img: {
        // 'min-width': '100%',
        // 'min-height': '100%',
        'height': 'auto',
        'width': '1.75vmax'
    }
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
            <Row>
                <Col xs={2}>
                    <Image className="mt-1" style={styles.img} src={this.props.user.userImg} rounded /> 
                </Col>
                <Col>
                    <Button onClick={this.onClick} block className="mb-2 mx-2" variant="outline-info">{this.props.user.username}</Button>
                </Col>
            </Row>
        )
    }
}

export default SidebarUser;