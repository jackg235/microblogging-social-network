import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { changePassword } from '../../slices/actions/AuthenticationActions';

const styles = (theme) => ({
//   ...theme,
//   submitButton: {
//     position: 'relative',
//     float: 'right',
//     marginTop: 10
//   },
//   progressSpinner: {
//     position: 'absolute'
//   },
//   closeButton: {
//     position: 'absolute',
//     left: '91%',
//     top: '6%'
//   }
});

class ChangePassword extends Component {
  state = {
    open: false,
    newPassword: '',
    errors: {}
  };
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.UI.errors) {
//       this.setState({
//         errors: nextProps.UI.errors
//       });
//     }
//     if (!nextProps.UI.errors && !nextProps.UI.loading) {
//       this.setState({ content: '', open: false, errors: {} });
//     }
//   }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    // this.props.clearErrors();
    this.setState({ open: false
        // , errors: {} 
    });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.changePassword(this.props.auth.username, this.state.newPassword)
    this.setState({ content: '', open: false, errors: {} });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      // auth
    } = this.props;
    return (
      <Fragment>
        <Button onClick={this.handleOpen} tip="Change Your Password!">
          {'Change Password'}
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
          >
            <CloseIcon />
          </Button>
          <DialogTitle>Enter Your New Password</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="newPassword"
                type="text"
                label="New Password"
                multiline
                rows="1"
                placeholder="Enter your new password"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

// ChangePassword.propTypes = {
//   newPost: PropTypes.func.isRequired,
//   clearErrors: PropTypes.func.isRequired,
//   UI: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => ({
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
  return ({
      changePassword: (username, newPassword) => dispatch(changePassword(username, newPassword)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChangePassword));
