import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
// import { createPost } from '../../slices/actions/PostActions';

const styles = (theme) => ({

});

class ShowContacts extends Component {
  state = {
    open: false,
    errors: {}
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { errors } = this.state;
    const {
      followers,
      following,
      // auth
    } = this.props;

    const followerLinks = followers.map((username) => {
        return <Link to={`/profile/${username}`}>{username}</Link>
    })
    const followingLinks = following.map((username) => {
        return <Link to={`/profile/${username}`}>{username}</Link>
    })

    return (
      <Fragment>
        <Button onClick={this.handleOpen} tip="Show Contacts!">
          {followers.length} Followers, {following.length} Following
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <Button
            tip="Close"
            onClick={this.handleClose}
            // tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </Button>
          <DialogTitle>Followers</DialogTitle>
          <DialogContent>
            {followerLinks}
          </DialogContent>
          <DialogTitle>Following</DialogTitle>
          <DialogContent>
            {followingLinks}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

// ShowContacts.propTypes = {
//   newPost: PropTypes.func.isRequired,
//   clearErrors: PropTypes.func.isRequired,
//   UI: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => ({
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
  return ({
    //   newPost: (title, content, username) => dispatch(createPost(title, content, username))
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ShowContacts));
