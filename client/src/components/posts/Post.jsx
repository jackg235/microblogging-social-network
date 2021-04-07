import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import PropTypes from 'prop-types';


// import DeletePost from './DeletePost';
// import PostDialog from './PostDialog';
// import LikeButton from './LikeButton';
// MUI Stuff
// import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
// import ChatIcon from '@material-ui/icons/Chat';
import DefaultProPic from '../../default_propic.jpg'

import { connect } from 'react-redux';

const styles = {
  image: {
    width: 150,
    height: 150,
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  content: {
    padding: 25,
    objectFit: 'cover',
    display: 'inline-block',
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
        title,
        content,
        timestamp,
        likes,
        comments
      },
    //   user: {
    //     authenticated,
    //     credentials: { handle }
    //   }
    } = this.props;

    // code to display delete button only to owner of post

    // const deleteButton =
    //   authenticated && posterId === handle ? (
    //     <DeletePost postId={postId} />
    //   ) : null;

    return (
    <div>
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
            // to={`/users/${posterId}`}
            color="primary"
          >
            {posterId}
          </Typography>
          {/* {deleteButton} */}
          <Typography variant="body2" color="textSecondary">
            {/* {dayjs(timestamp).fromNow()} */}
            {timestamp}
          </Typography>
          <Typography variant="title1">{title}</Typography>
          <Typography variant="body1">{content}</Typography>
          {/* <LikeButton postId={postId} /> */}
          <span>{likes} Likes</span>
          <span>{comments} comments</span>
          {/* <PostDialog
            postId={postId}
            posterId={posterId}
            openDialog={this.props.openDialog}
          /> */}
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
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
