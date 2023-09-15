/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import { markTypes } from '../constants';

const Leaf = ({ attributes, children = null, leaf }) => {
  const newChildren = R.compose(
    R.when(
      () => R.has(markTypes.sub, leaf),
      (c) => <sub>{c}</sub>,
    ),
    R.when(
      () => R.has(markTypes.sup, leaf),
      (c) => <sup>{c}</sup>,
    ),
    R.when(
      () => R.has(markTypes.underline, leaf),
      (c) => <u>{c}</u>,
    ),
    R.when(
      () => R.has(markTypes.italic, leaf),
      (c) => <em>{c}</em>,
    ),
    R.when(
      () => R.has(markTypes.bold, leaf),
      (c) => <strong>{c}</strong>,
    ),
  )(children);

  return <span {...attributes}>{newChildren}</span>;
};

Leaf.propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  leaf: PropTypes.object.isRequired,
};

export default Leaf;
