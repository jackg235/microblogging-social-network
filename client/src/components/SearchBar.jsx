import React from 'react'
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import '../static/stylesheets/SearchBar.css'


class SearchBar extends React.Component {
  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: '',
    redirect: false,
  };
  constructor(props) {
    super(props)
    this.state = {
      people: ['Jack', 'Tom', 'Frankel', 'John', 'James', 'Johnnie', 'Greg'],
  }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ search: this.state.userInput, redirect: true });
  }

  onChange = (e) => {
    const options = this.state.people;
    const userInput = e.currentTarget.value;

    const filteredOptions = options.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption]
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
    if (this.state.redirect) {
      const param = this.state.search;
      //return (<Redirect to={`/profile/${param}`} />);
    }

    const {
      onChange,
      onClick,
      onKeyDown,

      state: { activeOption, filteredOptions, showOptions, userInput }
    } = this;

    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                <li className={className} key={optionName} onClick={onClick}>
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No Option!</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="search">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="search-box"
              onSubmit={this.handleSubmit}
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={userInput}
              placeholder='Search for something'
            />
            <input onSubmit={this.handleSubmit} type="submit" value="" className="search-btn" />
          </form>
        </div>
        {optionList}
      </React.Fragment>
    );
  }
}

SearchBar.propTypes = {
  data: PropTypes.any
}

export default SearchBar