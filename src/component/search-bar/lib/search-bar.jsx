import React from 'react';
import PropTypes from 'prop-types';

import keycodes from '../../../utils/keycodes';
import '../styles/search-bar.css';

class SearchBar extends React.Component {

  constructor() {
    super();
    this.input = null;
  }

  handleEscape() {

  }

  renderDropdown(item, id) {
    return (
      <li key={id}>
        <span>{item}</span>
      </li>
    );
  }

  render() {
    return (
      <div className="search-bar card">
        <input
          id="search"
          ref={(ref) => { this.input = ref; }}
          placeholder="Search"
          onChange={(e) => {
            this.props.onChange(e.target.value);
          }}
          onFocus={(e) => {
            e.target.parentNode.classList.add('focused');
          }}
          onBlur={(e) => {
            e.target.parentNode.classList.remove('focused');
          }}
          onKeyDown={(e) => {
            switch (e.key) {
              case keycodes.ENTER.key:
                this.props.onEnterDown(e.target.value);
                this.props.onSearch(e.target.value);
                break;
              case keycodes.ESCAPE.key:
                this.handleEscape();
                break;
              default:
                break;
            }
          }}
        />
        <i className="material-icons">search</i>
        <ul className="dropdown-content">
          {this.props.keywords.map((item, index) => this.renderDropdown(item, index))}
        </ul>
      </div>
    );
  }
}

SearchBar.propTypes = {
  keywords: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  onEnterDown: PropTypes.func,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
};

SearchBar.defaultProps = {
  onEnterDown: () => {},
  onChange: () => {},
  onSearch: () => {},
};


export default SearchBar;
