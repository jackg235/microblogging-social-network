import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
// import dayjs from 'dayjs';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import {deleteComment} from '../../slices/actions/PostActions'

import DefaultProPic from '../../default_propic.jpg'

const styles = (theme) => ({
  commentImage: {
        width: 60,
        height: 60,
        display: 'inline-block',
        marginLeft: 'auto',
        marginRight: 'auto',
  },
  commentData: {
    // marginLeft: 20
  },
  commentContainer: {
    border: '2px solid rgba(0, 0, 0, 0.5)',
  },
  deleteComment: {
    backgroundColor: 'red',
  }
});

class CommentList extends Component {

  constructor(props) {
    super(props);
    this.deleteComment = this.deleteComment.bind(this)
  }

  deleteComment(commenterId, commentId, postId, posterId) {
    this.props.deleteComment(commenterId, commentId, postId, posterId)
  }

  render() {
    const { 
        post: {
          comments,
        },
        classes,
        auth: {
            authenticated,
            username,
        }
    } = this.props;

    return (
      <Grid container>
        {comments.slice(0).reverse().map((comment, index) => {

          const deleteButton =
          authenticated && comment.username === username ? (
            <Button 
            onClick={() => {this.deleteComment(comment.username, comment._id, this.props.post._id, this.props.post.username)}}
            className={classes.deleteComment}
            >
                {'Delete Comment'}
            </Button>
          ) : null;

          return (
            <Fragment key={comment.date}>
              <Grid item sm={12}>
                <Grid container className={classes.commentContainer}>
                  <Grid item sm={2}>
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/profile/${comment.username}`}
                        color="primary"
                      >
                        {comment.username}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {/* {dayjs(comment.commentDate).format('h:mm a, MMMM DD YYYY')} */}
                        {comment.date}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variabnt="body1">{comment.content}</Typography>
                      {deleteButton}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

// CommentList.propTypes = {
//   comments: PropTypes.array.isRequired
// };

const mapStateToProps = (state) => ({
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
  return ({
    deleteComment: (commenterId, commentId, postId, posterId) => dispatch(deleteComment(commenterId, commentId, postId, posterId)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommentList));
