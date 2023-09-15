/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useSlate } from 'slate-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold } from '@fortawesome/free-solid-svg-icons/faBold';
import { faItalic } from '@fortawesome/free-solid-svg-icons/faItalic';
import { faUnderline } from '@fortawesome/free-solid-svg-icons/faUnderline';
import { faHeading } from '@fortawesome/free-solid-svg-icons/faHeading';
import { faListUl } from '@fortawesome/free-solid-svg-icons/faListUl';
import { faListOl } from '@fortawesome/free-solid-svg-icons/faListOl';
import { faSubscript } from '@fortawesome/free-solid-svg-icons/faSubscript';
import { faSuperscript } from '@fortawesome/free-solid-svg-icons/faSuperscript';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons/faAlignLeft';
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons/faAlignCenter';
import { faAlignRight } from '@fortawesome/free-solid-svg-icons/faAlignRight';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons/faAlignJustify';
import { faOutdent } from '@fortawesome/free-solid-svg-icons/faOutdent';
import { faIndent } from '@fortawesome/free-solid-svg-icons/faIndent';
import * as R from 'ramda';

import {
  isMarkActive,
  isBlockActive,
  toggleMark,
  toggleBlock,
  setBlockFormatValue,
  isBlockFormatValueActive,
} from '../utils/richTextUtil';
import {
  markTypes,
  blockTypes,
  formatTypes,
  alignTypes,
  toolbarItemTypes,
} from '../constants';
import RichTextContext from '../contexts/RichTextContext';

const Button = ({ active = false, children = null, ...props }) => (
  <div
    className={`rs-button ${active ? 'rs-active' : 'rs-inactive'}`}
    {...props}
  >
    {children}
  </div>
);

Button.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  const { disabled } = useContext(RichTextContext);

  return (
    <Button
      active={isMarkActive(editor, format)}
      onClick={(e) => {
        e.preventDefault();
        if (!disabled) {
          toggleMark(editor, format);
        }
      }}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};

MarkButton.propTypes = {
  format: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

const BlockButton = ({ format, icon = null, children = null }) => {
  const editor = useSlate();
  const { disabled } = useContext(RichTextContext);

  return (
    <Button
      active={isBlockActive(editor, format)}
      onClick={(e) => {
        e.preventDefault();
        if (!disabled) {
          toggleBlock(editor, format);
        }
      }}
      disabled={disabled}
    >
      {children || <FontAwesomeIcon icon={icon} />}
    </Button>
  );
};

BlockButton.propTypes = {
  format: PropTypes.string.isRequired,
  icon: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const BlockFormatButton = ({ format, valueOrValueTransformer, icon }) => {
  const editor = useSlate();
  const { disabled } = useContext(RichTextContext);

  return (
    <Button
      active={isBlockFormatValueActive(editor, format, valueOrValueTransformer)}
      onClick={(e) => {
        e.preventDefault();
        if (!disabled) {
          setBlockFormatValue(editor, format, valueOrValueTransformer);
        }
      }}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};

BlockFormatButton.propTypes = {
  format: PropTypes.string.isRequired,
  valueOrValueTransformer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  icon: PropTypes.object.isRequired,
};

const Bold = () => <MarkButton format={markTypes.bold} icon={faBold} />;
const Italic = () => <MarkButton format={markTypes.italic} icon={faItalic} />;
const Underline = () => (
  <MarkButton format={markTypes.underline} icon={faUnderline} />
);
const Subscript = () => (
  <MarkButton format={markTypes.sub} icon={faSubscript} />
);
const Superscript = () => (
  <MarkButton format={markTypes.sup} icon={faSuperscript} />
);

const AlignLeft = () => (
  <BlockFormatButton
    format={formatTypes.align}
    valueOrValueTransformer={alignTypes.left}
    icon={faAlignLeft}
  />
);
const AlignCenter = () => (
  <BlockFormatButton
    format={formatTypes.align}
    valueOrValueTransformer={alignTypes.center}
    icon={faAlignCenter}
  />
);
const AlignRight = () => (
  <BlockFormatButton
    format={formatTypes.align}
    valueOrValueTransformer={alignTypes.right}
    icon={faAlignRight}
  />
);
const AlignJustify = () => (
  <BlockFormatButton
    format={formatTypes.align}
    valueOrValueTransformer={alignTypes.justify}
    icon={faAlignJustify}
  />
);
const Outdent = () => (
  <BlockFormatButton
    format={formatTypes.indent}
    valueOrValueTransformer={(v) => (v && v > 0 ? R.subtract(v, 1) : 0)}
    icon={faOutdent}
  />
);
const Indent = () => (
  <BlockFormatButton
    format={formatTypes.indent}
    valueOrValueTransformer={(v) => {
      if (v === 8) {
        return 8;
      }
      return v ? R.add(v, 1) : 1;
    }}
    icon={faIndent}
  />
);

const Heading1 = () => (
  <BlockButton format={blockTypes.heading1}>
    <FontAwesomeIcon icon={faHeading} />
    <span
      style={{
        position: 'relative',
        top: '1px',
        fontFamily: 'sans-serif',
        fontSize: '17px',
        fontWeight: 'bold',
      }}
    >
      1
    </span>
  </BlockButton>
);
const Heading2 = () => (
  <BlockButton format={blockTypes.heading2}>
    <FontAwesomeIcon icon={faHeading} />
    <span
      style={{
        position: 'relative',
        top: '1px',
        fontFamily: 'sans-serif',
        fontSize: '17px',
        fontWeight: 'bold',
      }}
    >
      2
    </span>
  </BlockButton>
);
const BulletedList = () => (
  <BlockButton format={blockTypes.bulletedList} icon={faListUl} />
);
const NumberedList = () => (
  <BlockButton format={blockTypes.numberedList} icon={faListOl} />
);

const LinkButton = () => {
  const editor = useSlate();

  const {
    setCanHoveringToolbarBeDisplayed,
    setIsInsertLinkFormVisible,
    disabled,
  } = useContext(RichTextContext);

  return (
    <Button
      active={isBlockActive(editor, blockTypes.link)}
      onClick={(e) => {
        e.preventDefault();
        if (!disabled) {
          setCanHoveringToolbarBeDisplayed(false);
          setIsInsertLinkFormVisible(true);
        }
      }}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={faLink} />
    </Button>
  );
};

export const Separator = () => <div className="rs-button-separator" />;

const componentByType = {
  [toolbarItemTypes.bold]: Bold,
  [toolbarItemTypes.italic]: Italic,
  [toolbarItemTypes.underline]: Underline,
  [toolbarItemTypes.sup]: Subscript,
  [toolbarItemTypes.sub]: Superscript,
  [toolbarItemTypes.alignLeft]: AlignLeft,
  [toolbarItemTypes.alignCenter]: AlignCenter,
  [toolbarItemTypes.alignRight]: AlignRight,
  [toolbarItemTypes.alignJustify]: AlignJustify,
  [toolbarItemTypes.outdent]: Outdent,
  [toolbarItemTypes.indent]: Indent,
  [toolbarItemTypes.heading1]: Heading1,
  [toolbarItemTypes.heading2]: Heading2,
  [toolbarItemTypes.bulletedList]: BulletedList,
  [toolbarItemTypes.numberedList]: NumberedList,
  [toolbarItemTypes.link]: LinkButton,
  [toolbarItemTypes.separator]: Separator,
};

const NullComponent = () => null;

const getComponentByName = R.propOr(NullComponent, R.__, componentByType);

export default getComponentByName;
