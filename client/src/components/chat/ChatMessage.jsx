import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const styles = {
    img: {
        "width": "85%"
    }
}

class ChatMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (this.props.message.type === 'media') {
            const contentType = this.props.message.media.contentType.toLowerCase();
            if (contentType.includes('audio') || contentType.includes('image')) {
                this.props.message.media.getContentTemporaryUrl().then(url => {
                    this.setState({ mediaurl: url, type: contentType.split('/')[0] });
                });
            } else if (contentType.includes('video')) {
                this.props.message.media.getContentTemporaryUrl()
                .then(url => fetch(url))
                .then(res => res.blob())
                .then(blob => URL.createObjectURL(blob))
                .then(url => this.setState({ mediaurl: url, type: 'video' }))
                .catch(err => console.error(err));
            }
        }
    }

    convertTime = (timestamp) => {
        const [date, time] = JSON.stringify(timestamp).replace(new RegExp('\"', 'g'), '').split('T');
        const [y, m, d] = date.trim().split('-');
        const year = parseInt(y) % 2000;
        const month = parseInt(m);
        const day = parseInt(d);
        const [hr, min, ...rest] = time.split(':');
        const hour = parseInt(hr) % 12;
        const amPm = parseInt(hr) > 11 ? 'PM' : 'AM';
        return `${month}/${day}/${year} ${hour}:${min} ${amPm}`;
    };

    render() {
        // if a media message
        const media = this.state.mediaurl !== undefined ?
            (this.state.type === 'image' ? <img style={styles.img} src={this.state.mediaurl} alt="no pic"/> : (
            this.state.type === 'audio' ? <audio src={this.state.mediaurl} style={{ "display": "block", "width": "100%"}} controls="controls" /> :
            <video style={{"width": "80%"} } src={this.state.mediaurl} type={this.props.message.media.contentType} controls></video>)) : null;
        
        const variant = this.state.mediaurl !== undefined ? 'info' : 'outline-info';
        return (
            <div>
                <Button block className="mb-4 mx-1" variant={variant}>
                    <Row>
                        <Col xs={8}>
                            <p style={{"text-align": "left"}}>{this.convertTime(this.props.message.state.timestamp)}</p>
                        </Col>
                        <Col>
                            <p style={{"text-align": "right"}}>Idx: {this.props.message.index}</p>
                        </Col>
                    </Row>
                    <p>Author: {this.props.message.state.author}</p>
                    <p>Body: {this.props.message.state.body}</p>
                    {media}
                </Button>
            </div>

        );
    }
}

export default ChatMessage;
