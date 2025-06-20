/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createEditor, Transforms, Editor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';
import * as R from 'ramda';

import RichTextContext from '../contexts/RichTextContext';
import Leaf from './Leaf';
import Element from './Element';
import LinkForm from './LinkForm';
import { withInlines, withStripPastedNewLines } from '../utils/richTextUtil';
import { richTextEmptyValue } from '../constants';
import getComponentByName from './buttons';
import { isNilOrEmpty, mapWithIndex } from '../utils/ramdaUtil';
import Toolbar from './Toolbar';
import HoveringToolbar from './HoveringToolbar';

const createToolbarItems = (itemTypes, extraToolbarProps = {}) => {
  if (isNilOrEmpty(itemTypes)) {
    return null;
  }
  return mapWithIndex((type, i) => {
    const Item = getComponentByName(type, extraToolbarProps[type] || {});
    return <Item key={`${type}-${i}`} />;
  }, itemTypes);
};

const RichText = ({
  initialValue,
  setValue,
  placeholder = '',
  singleLine = false,
  onBlur = null,
  toolbar = [],
  hoveringToolbar = [],
  editorFooterContent = null,
  disabled = false,
  className = '',
  popperClassName = '',
  predefinedTexts = [],
}) => {
  const withHandleInsertData = useMemo(
    () => (singleLine ? withStripPastedNewLines : R.identity),
    [singleLine],
  );

  const editor = useMemo(
    () =>
      withHandleInsertData(withInlines(withHistory(withReact(createEditor())))),
    [withHandleInsertData],
  );

  const [canHoveringToolbarBeDisplayed, setCanHoveringToolbarBeDisplayed] =
    useState(false);
  const [isInsertLinkFormVisible, setIsInsertLinkFormVisible] = useState(false);
  const [isEditLinkFormVisible, setIsEditLinkFormVisible] = useState(false);

  const allowToolbarToBeDisplayed = useCallback(() => {
    setCanHoveringToolbarBeDisplayed(true);
  }, []);
  const handleRichTextBlur = useCallback(() => {
    setCanHoveringToolbarBeDisplayed(false);

    // on top of "normal" blur, rich text can lose focus because popper form is displayed
    // (e.g.: link form)
    // when blur occurs (and form poppers are not displayed), reset selection so that when
    // the rich text gets focus again, the selected state of elements (e.g.: links) can change from
    // false to true and the popper can be displayed as expected
    if (!isEditLinkFormVisible && !isInsertLinkFormVisible) {
      Transforms.select(editor, {
        anchor: Editor.start(editor, []),
        focus: Editor.start(editor, []),
      });
    }
    if (onBlur) {
      onBlur();
    }
  }, [editor, isEditLinkFormVisible, isInsertLinkFormVisible, onBlur]);

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const renderElement = useCallback((props) => <Element {...props} />, []);

  const richTextContext = useMemo(
    () => ({
      canHoveringToolbarBeDisplayed,
      setCanHoveringToolbarBeDisplayed,
      isInsertLinkFormVisible,
      setIsInsertLinkFormVisible,
      isEditLinkFormVisible,
      setIsEditLinkFormVisible,
      popperClassName,
      disabled,
    }),
    [
      canHoveringToolbarBeDisplayed,
      isInsertLinkFormVisible,
      isEditLinkFormVisible,
      popperClassName,
      disabled,
    ],
  );

  const preventNewLineHandler = useMemo(() => {
    return (e) => {
      if (singleLine && isHotkey('shift?+enter', e)) {
        e.preventDefault();
        return;
      }

      if (isHotkey('shift+enter', e)) {
        Editor.insertText(editor, '\n');
        e.preventDefault();
      }
    };
  }, [singleLine, editor]);

  useEffect(() => {
    // initialize a selection so that rich text fields can get focus on tab key
    Transforms.select(editor, {
      anchor: Editor.start(editor, []),
      focus: Editor.start(editor, []),
    });
  }, [editor]);

  const toolbarExtraProps = useMemo(
    () => ({ 'predefined-texts': { predefinedTexts } }),
    [predefinedTexts],
  );
  const toolbarItems = useMemo(
    () => createToolbarItems(toolbar, toolbarExtraProps),
    [toolbar, toolbarExtraProps],
  );
  const hoveringToolbarItems = useMemo(
    () => createToolbarItems(hoveringToolbar, toolbarExtraProps),
    [hoveringToolbar, toolbarExtraProps],
  );

  return (
    <RichTextContext.Provider value={richTextContext}>
      <div className={`rs-richtext ${className}`}>
        <Slate
          editor={editor}
          initialValue={
            isNilOrEmpty(initialValue) ? richTextEmptyValue : initialValue
          }
          onChange={setValue}
          disabled
        >
          <div style={{ width: '100%' }}>
            {toolbarItems && <Toolbar>{toolbarItems}</Toolbar>}
            {hoveringToolbarItems && (
              <HoveringToolbar popperClassName={popperClassName}>
                {hoveringToolbarItems}
              </HoveringToolbar>
            )}
            {isInsertLinkFormVisible && (
              <LinkForm popperClassName={popperClassName} />
            )}
            <Editable
              onFocus={allowToolbarToBeDisplayed}
              onBlur={handleRichTextBlur}
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              onKeyDown={preventNewLineHandler}
              placeholder={placeholder}
              renderPlaceholder={({ children, attributes }) => (
                <span {...attributes} className="rs-richtext-input-placeholder">
                  {children}
                </span>
              )}
              className="rs-richtext-input"
              tabIndex={0}
              readOnly={disabled}
            />
            {editorFooterContent && (
              <div className="rs-footer">{editorFooterContent}</div>
            )}
          </div>
        </Slate>
      </div>
    </RichTextContext.Provider>
  );
};

RichText.propTypes = {
  initialValue: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  singleLine: PropTypes.bool,
  onBlur: PropTypes.func,
  toolbar: PropTypes.array,
  hoveringToolbar: PropTypes.array,
  editorFooterContent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  popperClassName: PropTypes.string,
  predefinedTexts: PropTypes.array,
};

export default RichText;
