/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

const Toolbar = ({ children }) => (
  <div
    onMouseDown={(e) => {
      e.preventDefault();
    }}
    className="rs-toolbar"
    role="menubar"
    tabIndex={0}
  >
    {children}
  </div>
);

Toolbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Toolbar.defaultProps = {
  children: null,
};

export default Toolbar;
