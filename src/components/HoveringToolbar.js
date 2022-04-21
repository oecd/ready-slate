import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSlate } from 'slate-react';
import { Editor, Range } from 'slate';

import RichTextContext from '../contexts/RichTextContext';
import DomRectPopper from './DomRectPopper';

const HoveringToolbar = ({ children, popperClassName }) => {
  const editor = useSlate();

  const [virtualRef, setVirtualRef] = useState(null);
  const [domRect, setDomRect] = useState(null);

  const { canHoveringToolbarBeDisplayed } = useContext(RichTextContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const { selection } = editor;

    if (
      !selection ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      setVirtualRef(null);
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);

    setVirtualRef(domRange);
  });

  useEffect(() => {
    setDomRect(virtualRef ? virtualRef.getBoundingClientRect() : null);
  }, [virtualRef]);

  return canHoveringToolbarBeDisplayed && domRect ? (
    <DomRectPopper
      domRect={domRect}
      preventDefault
      popperClassName={popperClassName}
    >
      <div className="rs-hovering-toolbar">{children}</div>
    </DomRectPopper>
  ) : null;
};

HoveringToolbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  popperClassName: PropTypes.string,
};

HoveringToolbar.defaultProps = {
  children: null,
  popperClassName: '',
};

export default HoveringToolbar;
