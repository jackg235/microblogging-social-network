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
    this.hidePost = this.hidePost.bind(this)
    this.deletePost = this.deletePost.bind(this)
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
          <Typography variant="body1">{content}</Typography>
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
  auth: state.auth
});

function mapDispatchToProps(dispatch) {
  return ({
      hidePost: (username, postId, posterId) => dispatch(hidePost(username, postId, posterId)),
      deletePost: (username, postId) => dispatch(deletePost(username, postId)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Post));
