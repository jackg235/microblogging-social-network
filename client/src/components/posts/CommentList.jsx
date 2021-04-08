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
  render() {
    const { 
        comments, 
        classes,
        auth: {
            authenticated,
            email,
        }
    } = this.props;

    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { content, timestamp, userImg, commenterId, first } = comment;

          const deleteButton =
          authenticated && commenterId === email ? (
            <Button 
            // onclick=deleteComment(commentId)
            className={classes.deleteComment}
            >
                {'Delete Comment'}
            </Button>
          ) : null;

          return (
            <Fragment key={timestamp}>
              <Grid item sm={12}>
                <Grid container className={classes.commentContainer}>
                  <Grid item sm={2}>
                    <img
                      src={userImg}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        // to={`/users/${commenterId}`}
                        color="primary"
                      >
                        {first}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {/* {dayjs(timestamp).format('h:mm a, MMMM DD YYYY')} */}
                        {timestamp}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variabnt="body1">{content}</Typography>
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

export default connect(mapStateToProps)(withStyles(styles)(CommentList));
