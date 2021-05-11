import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CommentList from './CommentList';
import CreateComment from './CreateComment';

import DefaultProPic from '../../default_propic.jpg'
import {hidePost, deletePost} from '../../slices/actions/PostActions'

import { connect } from 'react-redux';

const styles = {
  image: {
    width: 200,
    height: 200,
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  content: {
    padding: 25,
    objectFit: 'cover',
    display: 'inline-block',
  },
  hidePost: {
    backgroundColor: 'yellow',
  },
  likePost: {
    backgroundColor: 'pink',
  },
  deletePost: {
    backgroundColor: 'red',
  },
  postContainer: {
      border: '2px solid rgba(0, 0, 0, 0.5)',
  }
};

class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      words: [],
      mentions: [],
    }
    this.hidePost = this.hidePost.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.addMentions = this.addMentions.bind(this)
    // this.addMentions(this.props.post.content)
  }

  hidePost() {
    this.props.hidePost(this.props.auth.username, this.props.post._id, this.props.post.username)
  }

  deletePost() {
    this.props.deletePost(this.props.auth.username, this.props.post._id)
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };
  addMentions(content) {
    const words = content.split(" ")
    const mentionIndexes = []
    for (let i = 0; i < words.length; i++) {
      const name = words[i].substring(1)
      if (words[i].charAt(0) === '@' && this.props.users.allUsers.includes(name)) {
        mentionIndexes.push(1)
      } else {
        mentionIndexes.push(0)
      }
    }
    this.setState({
      words: words,
      mentions: mentionIndexes
    })
  }

  componentDidMount() {
    this.addMentions(this.props.post.content)
  }

  render() {
    // dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        _id,
        username,
        title,
        content,
        postDate,
        likes,
        comments,
          media
      },
      auth: {
        authenticated,
      }
    } = this.props;

    // post image stuff
    let img;
    if (media != null) {
      const data = media.data.data
      const base64Flag = 'data:image/jpeg;base64,';
      const imageStr = this.arrayBufferToBase64(data);
      img = base64Flag + imageStr
    }
    const mediaImage =
        media != null ? (
            <CardMedia
                image={img}
                className={classes.image}
                style={styles.image}
            />
        ) : null

    // mentions stuff
    const wordElements = this.state.words.map((word, i) => {
      let withSpace = word + " "
      return this.state.mentions[i] === 1 ? (
        <Link to={`/profile/${word.substring(1)}`}>{withSpace}</Link>
      ) : withSpace
    })

    // code to display delete button only to owner of post
    const deleteButton =
      authenticated && username === this.props.auth.username ? (
        <Button 
        onClick={() => {this.deletePost()}}
        className={classes.deletePost}
        >
            {'Delete'}
        </Button>
      ) : null;
    return (
    <div className={classes.postContainer}>
      {mediaImage}
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/profile/${username}`}
            color="primary"
          >
            {username}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {postDate}
          </Typography>
          <Typography variant="title1">{title}</Typography>
          <Typography variant="body1">{wordElements}</Typography>
          <span>{comments.length} comments </span>
          <CommentList post={this.props.post} />
        </CardContent>
          
        <CardContent className={classes.content}>
          <CreateComment 
            postId={_id}
            posterId={username}
          />
          <Button 
            onClick={() => {this.hidePost()}}
            className={classes.hidePost}
          >
              {'Hide Post'}
          </Button>
          {deleteButton}
        </CardContent>
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

function mapDispatchToProps(dispatch) {
  return ({
      hidePost: (username, postId, posterId) => dispatch(hidePost(username, postId, posterId)),
      deletePost: (username, postId) => dispatch(deletePost(username, postId)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Post));
