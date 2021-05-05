import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import PropTypes from 'prop-types';


// import DeletePost from './DeletePost';
// import LikeButton from './LikeButton';
// MUI Stuff
// import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CommentList from './CommentList';
import CreateComment from './CreateComment';

import DefaultProPic from '../../default_propic.jpg'
import {hidePost, deletePost, deleteComment} from '../../slices/actions/PostActions'

import { connect } from 'react-redux';

const styles = {
  image: {
    width: 100,
    height: 100,
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

  render() {
    // dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        _id,
        username,
        // first,
        // userImg,
        title,
        content,
        postDate,
        likes,
        comments,
      },
      auth: {
        authenticated,
      }
    } = this.props;

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
        <CardMedia
          image={DefaultProPic}
          title="Profile image"
          className={classes.image}
          style={styles.image}
        />
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
            {/* {dayjs(postDate).fromNow()} */}
            {postDate}
          </Typography>
          <Typography variant="title1">{title}</Typography>
          <Typography variant="body1">{content}</Typography>
          {/* <LikeButton _id={_id} /> */}
          <span>{likes.length} Likes </span>
          <span>{comments.length} comments </span>
          <CommentList post={this.props.post} />
        </CardContent>
          
        <CardContent className={classes.content}>
          <CreateComment 
            postId={_id}
            posterId={username}
          />
          <Button 
            // onclick=likePost(_id)
            className={classes.likePost}
          >
              {'Like Post'}
          </Button>
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

// Scream.propTypes = {
//   user: PropTypes.object.isRequired,
//   scream: PropTypes.object.isRequired,
//   classes: PropTypes.object.isRequired,
//   openDialog: PropTypes.bool
// };

const mapStateToProps = (state) => ({
  auth: state.auth
});

function mapDispatchToProps(dispatch) {
  console.log('dispatching')
  return ({
      hidePost: (username, postId, posterId) => dispatch(hidePost(username, postId, posterId)),
      deletePost: (username, postId) => dispatch(deletePost(username, postId)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Post));
