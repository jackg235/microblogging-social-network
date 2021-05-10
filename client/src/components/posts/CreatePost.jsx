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
import { createPost } from '../../slices/actions/PostActions';

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

class CreatePost extends Component {
  state = {
    open: false,
    title: '',
    content: '',
    errors: {},
      image: null
  };

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

  handleImageUpload = (e) => {
      e.preventDefault();
      this.setState({
          image: e.target.files[0]
      })
  }
  handleSubmit = (event) => {
      event.preventDefault();
      this.props.newPost(this.state.title, this.state.content, this.props.auth.username, this.state.image)
      this.setState({ content: '', open: false, errors: {} });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      // auth
    } = this.props;
    const changeImage = (
        <div>
          <br/>
          <label htmlFor="image">Upload JPEG Image: </label>
          <input name="media" onChange={this.handleImageUpload} type="file"/>
        </div>
        )
    return (
      <Fragment>
        <Button onClick={this.handleOpen} tip="Create a Post!">
          <AddIcon />
          {'Create New Post!'}
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
          <DialogTitle>Create a new blog post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
                <TextField
                name="title"
                type="text"
                label="Post Title"
                placeholder="Title your blog post!"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="content"
                type="text"
                label="Post Content"
                multiline
                rows="3"
                placeholder="Write a blog post!"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              {changeImage}
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

const mapStateToProps = (state) => ({
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
  return ({
      newPost: (title, content, username, image) => dispatch(createPost(title, content, username, image))
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreatePost));
