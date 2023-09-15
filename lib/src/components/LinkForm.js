import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useSlate, ReactEditor } from 'slate-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';
import { faUnlink } from '@fortawesome/free-solid-svg-icons/faUnlink';
import isUrl from 'is-url';
import isHotkey from 'is-hotkey';

import DomRectPopper from './DomRectPopper';
import RichTextContext from '../contexts/RichTextContext';
import { insertLink, updateLinkUrl, unwrapLink } from '../utils/richTextUtil';
import { Separator } from './buttons';

const LinkForm = ({
  initialUrl = '',
  mode = 'insert',
  popperClassName = '',
}) => {
  const {
    setCanHoveringToolbarBeDisplayed,
    setIsInsertLinkFormVisible,
    setIsEditLinkFormVisible,
  } = useContext(RichTextContext);

  const editor = useSlate();
  const [virtualRef, setVirtualRef] = useState(null);
  const [domRect, setDomRect] = useState(null);

  const [urlInputText, setUrlInputText] = useState(initialUrl);
  const urlInputRef = useRef(null);

  useEffect(() => {
    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);

    setVirtualRef(domRange);
  }, []);

  useEffect(() => {
    setDomRect(virtualRef ? virtualRef.getBoundingClientRect() : null);
  }, [virtualRef]);

  const onPopperMount = useCallback(() => {
    const timer = setTimeout(() => {
      if (urlInputRef.current) {
        urlInputRef.current.focus();
      }
    });
    return () => clearTimeout(timer);
  }, []);

  const closeForm = useCallback(() => {
    if (mode === 'edit') {
      setIsEditLinkFormVisible(false);
    } else {
      setIsInsertLinkFormVisible(false);
    }
    setCanHoveringToolbarBeDisplayed(true);
    ReactEditor.focus(editor);
  }, [
    mode,
    editor,
    setIsInsertLinkFormVisible,
    setIsEditLinkFormVisible,
    setCanHoveringToolbarBeDisplayed,
  ]);

  const submitForm = useCallback(() => {
    if (mode === 'insert') {
      insertLink(editor, urlInputText);
    } else {
      updateLinkUrl(editor, urlInputText);
    }
    closeForm();
  }, [mode, editor, urlInputText, closeForm]);

  const removeLink = useCallback(() => {
    unwrapLink(editor);
  }, [editor]);

  return domRect ? (
    <DomRectPopper
      domRect={domRect}
      onClickOutside={closeForm}
      onMount={onPopperMount}
      popperClassName={popperClassName}
    >
      <div style={{ display: 'flex' }}>
        <input
          type="text"
          ref={urlInputRef}
          value={urlInputText}
          onChange={(e) => setUrlInputText(e.target.value)}
          onKeyDown={(e) => {
            if (isHotkey('esc', e)) {
              closeForm();
              return;
            }
            if (isHotkey('shift?+enter', e) && isUrl(urlInputText)) {
              submitForm();
              e.preventDefault();
            }
          }}
          className="rs-form-input"
        />

        <div
          onClick={isUrl(urlInputText) ? submitForm : null}
          className="rs-button"
          role="button"
          disabled={!isUrl(urlInputText)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (isHotkey('enter', e) && isUrl(urlInputText)) {
              submitForm();
            }
          }}
        >
          <FontAwesomeIcon icon={faCheck} />
        </div>
        <div
          className="rs-button"
          onClick={closeForm}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (isHotkey('enter', e)) {
              closeForm();
            }
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        {mode === 'edit' && (
          <>
            <Separator />
            <a
              href={urlInputText}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex' }}
            >
              <div className="rs-button">
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </div>
            </a>
            <div
              onClick={removeLink}
              className="rs-button"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (isHotkey('enter', e)) {
                  removeLink();
                }
              }}
            >
              <FontAwesomeIcon icon={faUnlink} />
            </div>
          </>
        )}
      </div>
    </DomRectPopper>
  ) : null;
};

LinkForm.propTypes = {
  initialUrl: PropTypes.string,
  mode: PropTypes.string,
  popperClassName: PropTypes.string,
};

export default LinkForm;
