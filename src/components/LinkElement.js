/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Range } from 'slate';
import { useSlateStatic, useSelected } from 'slate-react';

import LinkForm from './LinkForm';
import RichTextContext from '../contexts/RichTextContext';

const LinkElement = ({ attributes, element, children }) => {
  const { isEditLinkFormVisible, setIsEditLinkFormVisible, popperClassName } =
    useContext(RichTextContext);

  const editor = useSlateStatic();
  const selected = useSelected();

  const { selection } = editor;

  useEffect(() => {
    if (selected) {
      setIsEditLinkFormVisible(true);
    }
  }, [selected, setIsEditLinkFormVisible]);

  return (
    <span>
      <a {...attributes} href={element.url} className="rs-link">
        {children}
      </a>
      {selected && isEditLinkFormVisible && Range.isCollapsed(selection) && (
        <LinkForm
          initialUrl={element.url}
          mode="edit"
          popperClassName={popperClassName}
        />
      )}
    </span>
  );
};

LinkElement.propTypes = {
  attributes: PropTypes.object.isRequired,
  element: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

LinkElement.defaultProps = {
  children: null,
};

export default LinkElement;
