import React from 'react';
import PropTypes from 'prop-types';

const RichText = ({ text }) => (
  <div className="ready-slate-richtext">{text}</div>
);

RichText.propTypes = {
  text: PropTypes.string,
};

RichText.defaultProps = {
  text: '',
};

export default RichText;
