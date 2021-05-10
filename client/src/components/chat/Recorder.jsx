import React from 'react';
import Container from 'react-bootstrap/Container';
import MicRecorder from 'mic-recorder-to-mp3';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Recorder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
    };
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        const randomName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        const file = new File(buffer, `${randomName}.mp3`, {
          type: blob.type,
          lastModified: Date.now()
        });
        this.props.newAudio(file);
        this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
  };

  componentDidMount() {
    navigator.getUserMedia = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );
    
    try {
      if (navigator.mediaDevices === undefined) {
        navigator.getUserMedia({ audio: true }, 
        () => {
          this.setState({ isBlocked: false });
        },
        () => {
          this.setState({ isBlocked: true })
        });
      } else {
          navigator.mediaDevices.getUserMedia({
              audio: true
          })
          .then(() => {
            this.setState({ isBlocked: false });
          })
          .catch(() => {
            this.setState({ isBlocked: true })
          });
      }
    } catch (e) {

    }
    // navigator.mediaDevices.getUserMedia({ audio: true },
    //   () => {
    //     this.setState({ isBlocked: false });
    //   },
    //   () => {
    //     this.setState({ isBlocked: true })
    //   },
    // );
  }

  render(){
    return (
      <div>
        <Container >
          <Row>
            <Col xs={3}>
              <Button onClick={this.start} disabled={this.state.isRecording} variant="outline-danger">Record</Button>
            </Col>
            <Col xs={3}>
              <Button onClick={this.stop} disabled={!this.state.isRecording} variant="outline-dark">Stop</Button>
            </Col>
            <Col xs={6}>
              <audio style={{"width": "100%"}} src={this.state.blobURL}  controls="controls" />
            </Col>
          </Row>
          
        </Container>
      </div>
    );
  }
}

export default Recorder;
