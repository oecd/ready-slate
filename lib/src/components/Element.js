/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Node } from 'slate';
import * as R from 'ramda';

import { blockTypes, formatTypes } from '../constants';
import LinkElement from './LinkElement';
import direction from '../utils/direction';

const Element = ({ attributes, children, element }) => {
  const style = R.compose(
    R.when(
      () => R.has(formatTypes.indent, element),
      R.assoc('paddingLeft', `${R.prop(formatTypes.indent, element)}em`),
    ),
    R.when(
      () => R.has(formatTypes.align, element),
      R.assoc('textAlign', R.prop(formatTypes.align, element)),
    ),
  )({});

  switch (element.type) {
    case blockTypes.heading1:
      return (
        <h1 {...attributes} style={style}>
          {children}
        </h1>
      );
    case blockTypes.heading2:
      return (
        <h2 {...attributes} style={style}>
          {children}
        </h2>
      );
    case blockTypes.listItem:
      return (
        <li {...attributes} style={style}>
          {children}
        </li>
      );
    case blockTypes.bulletedList: {
      const dir = direction(Node.string(element));
      const dirAttribute = dir === 'rtl' ? { dir: 'rtl' } : {};

      return (
        <ul {...attributes} {...dirAttribute}>
          {children}
        </ul>
      );
    }
    case blockTypes.numberedList: {
      const dir = direction(Node.string(element));
      const dirAttribute = dir === 'rtl' ? { dir: 'rtl' } : {};

      return (
        <ol {...attributes} {...dirAttribute}>
          {children}
        </ol>
      );
    }
    case blockTypes.paragraph:
      return (
        <p {...attributes} style={style}>
          {children}
        </p>
      );
    case blockTypes.link:
      return (
        <LinkElement attributes={attributes} element={element}>
          {children}
        </LinkElement>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

Element.propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  element: PropTypes.object.isRequired,
};

Element.defaultProps = {
  children: null,
};

export default Element;
