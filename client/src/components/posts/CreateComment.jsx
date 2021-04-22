import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux stuff
import { connect } from 'react-redux';

import {addComment, getComments} from '../../slices/actions/PostActions'

const styles = (theme) => ({
//   ...theme
});

class CreateComment extends Component {
  state = {
    content: '',
    errors: {}
  };

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.UI.errors) {
//       this.setState({ errors: nextProps.UI.errors });
//     }
//     if (!nextProps.UI.errors && !nextProps.UI.loading) {
//       this.setState({ body: '' });
//     }
//   }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addComment(
      this.props.auth.username,
      this.state.content,
      this.props.postId, 
    )

    // likely a better way to do this (componentWillReceiveProps??)
    this.setState({ content: '', open: false, errors: {} });
    this.props.getComments()
  };

  render() {
    const { classes, auth } = this.props;
    const errors = this.state.errors;
    
    return (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="content"
            type="text"
            label="Comment on Post"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.content}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
    </Grid>
    )
  }
}

// CreateComment.propTypes = {
//   submitComment: PropTypes.func.isRequired,
//   UI: PropTypes.object.isRequired,
//   classes: PropTypes.object.isRequired,
//   screamId: PropTypes.string.isRequired,
//   authenticated: PropTypes.bool.isRequired
// };

const mapStateToProps = (state) => ({
  auth: state.auth
});

function mapDispatchToProps(dispatch) {
  return ({
      addComment: (commenterId, content, postId) => dispatch(addComment(commenterId, content, postId)),
      getComments: () => dispatch(getComments()),
  })
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles)(CreateComment));
