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
  deletePost: {
    backgroundColor: 'red',
  },
  postContainer: {
      border: '2px solid rgba(0, 0, 0, 0.5)',
  }
};

class Post extends Component {
  render() {
    // dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        postId,
        posterId,
        first,
        userImg,
        title,
        content,
        timestamp,
        numLikes,
        comments,
      },
      auth: {
        authenticated,
        email,
      }
    } = this.props;

    // code to display delete button only to owner of post
    const deleteButton =
      authenticated && posterId === email ? (
        <Button 
        // onclick=deletePost(postId)
        className={classes.deletePost}
        >
            {'Delete'}
        </Button>
      ) : null;

    return (
    <div className={classes.postContainer}>
        <CardMedia
          image={userImg}
          title="Profile image"
          className={classes.image}
          style={styles.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            // to={`/users/${posterId}`}
            color="primary"
          >
            {first}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {/* {dayjs(timestamp).fromNow()} */}
            {timestamp}
          </Typography>
          <Typography variant="title1">{title}</Typography>
          <Typography variant="body1">{content}</Typography>
          {/* <LikeButton postId={postId} /> */}
          <span>{numLikes} Likes </span>
          <span>{comments.length} comments </span>
          <CommentList comments={comments} />
        </CardContent>
          
        <CardContent className={classes.content}>
          <CreateComment 
            postId={postId}
          />
          <Button 
            // onclick=hidePost(postId)
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

export default connect(mapStateToProps)(withStyles(styles)(Post));
