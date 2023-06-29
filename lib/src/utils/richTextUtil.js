import {
  Editor,
  Transforms,
  Element as SlateElement,
  Range,
  Text,
  Node,
} from 'slate';
import { jsx } from 'slate-hyperscript';
import escapeHtml from 'escape-html';
import * as R from 'ramda';

import {
  markTypes,
  blockTypes,
  listTypes,
  inlineBlockTypes,
  formatTypes,
  defaultFormatValueByFormat,
  validBlockTypesByFormat,
  richTextEmptyValue,
} from '../constants';
import { isNilOrEmpty, reduceWithIndex } from './ramdaUtil';
import direction from './direction';

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? R.propEq(true, format, marks) : false;
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (editor, format) => {
  const { selection } = editor;
  if (!selection) {
    return false;
  }

  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    }),
  );

  return !!match;
};

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = R.includes(format, listTypes);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      R.includes(n.type, listTypes),
    split: true,
  });

  const newType = R.cond([
    [R.equals(true), R.always(blockTypes.paragraph)],
    [() => isList, R.always(blockTypes.listItem)],
    [R.T, R.always(format)],
  ])(isActive);

  Transforms.setNodes(editor, { type: newType });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const setBlockFormatValue = (
  editor,
  format,
  valueOrValueTransformer,
) => {
  const defaultValue = R.prop(format, defaultFormatValueByFormat);
  const validTypes = R.prop(format, validBlockTypesByFormat);

  if (typeof valueOrValueTransformer === 'function') {
    const nodes = Array.from(
      Editor.nodes(editor, {
        match: (n) =>
          Editor.isBlock(editor, n) &&
          !!validTypes &&
          R.includes(n.type, validTypes),
      }),
    );

    R.forEach(([node, path]) => {
      const newValue = valueOrValueTransformer(R.prop(format, node));

      if (newValue === defaultValue) {
        Transforms.unsetNodes(editor, format, { at: path });
      } else {
        Transforms.setNodes(editor, { [format]: newValue }, { at: path });
      }
    }, nodes);
  } else {
    const match = (n) =>
      Editor.isBlock(editor, n) &&
      !!validTypes &&
      R.includes(n.type, validTypes);

    if (valueOrValueTransformer === defaultValue) {
      Transforms.unsetNodes(editor, format, { match });
    } else {
      Transforms.setNodes(
        editor,
        { [format]: valueOrValueTransformer },
        { match },
      );
    }
  }
};

export const isBlockFormatValueActive = (
  editor,
  format,
  valueOrValueTransformer,
) => {
  const defaultValue = R.prop(format, defaultFormatValueByFormat);
  const validTypes = R.prop(format, validBlockTypesByFormat);

  if (typeof valueOrValueTransformer === 'function') {
    return false;
  }

  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        R.includes(n.type, validTypes) &&
        (R.propEq(valueOrValueTransformer, format, n) ||
          (valueOrValueTransformer === defaultValue && !R.has(format, n))),
    }),
  );

  return !!match;
};

export const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      n.type === blockTypes.link,
  });
  return !!link;
};

export const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      n.type === blockTypes.link,
  });
};

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: blockTypes.link,
    url,
    target: '_blank',
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const updateLinkUrl = (editor, url) => {
  Transforms.setNodes(
    editor,
    { url },
    {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === blockTypes.link,
    },
  );
};

/* eslint-disable no-param-reassign */
export const withInlines = (editor) => {
  const { isInline } = editor;

  editor.isInline = (element) =>
    R.includes(element.type, inlineBlockTypes) || isInline(element);

  return editor;
};
/* eslint-enable no-param-reassign */

/* eslint-disable no-param-reassign */
export const withStripPastedNewLines = (editor) => {
  const { insertText } = editor;

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    insertText(R.replace(/\n/g, '', text));
  };

  return editor;
};
/* eslint-enable no-param-reassign */

export const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

export const slateToHtmlString = (node) => {
  if (isNilOrEmpty(node)) {
    return '<p></p>';
  }

  // assumes an array of nodes (like the value of an editor)
  if (R.is(Array, node)) {
    return slateToHtmlString({ children: node });
  }

  // basic conformance check to Slate interfaces
  // covers passing string and getting the same string back
  if (
    !(R.is(Object, node) && (R.has('children', node) || R.has('text', node)))
  ) {
    return node;
  }

  if (Text.isText(node)) {
    return R.compose(
      R.replace(/\n/g, '<br />'),
      R.when(
        () => R.has(markTypes.sub, node),
        (s) => `<sub>${s}</sub>`,
      ),
      R.when(
        () => R.has(markTypes.sup, node),
        (s) => `<sup>${s}</sup>`,
      ),
      R.when(
        () => R.has(markTypes.underline, node),
        (s) => `<u>${s}</u>`,
      ),
      R.when(
        () => R.has(markTypes.italic, node),
        (s) => `<em>${s}</em>`,
      ),
      R.when(
        () => R.has(markTypes.bold, node),
        (s) => `<strong>${s}</strong>`,
      ),
      escapeHtml,
    )(node.text);
  }

  const children = R.join('', R.map(slateToHtmlString, node.children));

  const style = R.compose(
    R.when(R.complement(R.isEmpty), (s) => ` style="${s}"`),
    R.join(';'),
    R.when(
      () => R.has(formatTypes.indent, node),
      R.append(`padding-left: ${R.prop(formatTypes.indent, node)}em`),
    ),
    R.when(
      () => R.has(formatTypes.align, node),
      R.append(`text-align: ${R.prop(formatTypes.align, node)}`),
    ),
  )([]);

  const dir = direction(Node.string(node));
  const dirAttribute = dir === 'rtl' ? ' dir="rtl"' : '';

  switch (node.type) {
    case blockTypes.heading1:
      return `<h1${style}${dirAttribute}>${children}</h1>`;
    case blockTypes.heading2:
      return `<h2${style}${dirAttribute}>${children}</h2>`;
    case blockTypes.listItem:
      return `<li${style}${dirAttribute}>${children}</li>`;
    case blockTypes.bulletedList:
      return `<ul${dirAttribute}>${children}</ul>`;
    case blockTypes.numberedList:
      return `<ol${dirAttribute}>${children}</ol>`;
    case 'paragraph':
      return `<p${style}${dirAttribute}>${children}</p>`;
    case 'link':
      return `<a href="${escapeHtml(node.url)}" target="${
        node.target
      }">${children}</a>`;
    default:
      return children;
  }
};

export const slateToString = (node) => {
  if (isNilOrEmpty(node)) {
    return '';
  }

  // assumes an array of nodes (like the value of an editor)
  if (R.is(Array, node)) {
    return slateToString({ children: node });
  }

  // basic conformance check to Slate interfaces
  // covers passing string and getting the same string back
  if (
    !(R.is(Object, node) && (R.has('children', node) || R.has('text', node)))
  ) {
    return node;
  }

  if (Text.isText(node)) {
    return R.replace(/\n/g, '', R.trim(node.text));
  }

  const children = R.join(
    ' ',
    R.reject(R.isEmpty, R.map(slateToString, node.children)),
  );

  return children;
};

const normalizeInlineNodes = reduceWithIndex(
  (acc, node, index, nodes) =>
    R.compose(
      R.when(
        () =>
          (R.includes(node.type, inlineBlockTypes) &&
            index === R.length(nodes) - 1) ||
          R.includes(nodes[index + 1]?.type, inlineBlockTypes),
        R.append({ text: '' }),
      ),
      R.append(node),
      R.when(
        () => R.includes(node.type, inlineBlockTypes) && index === 0,
        R.append({ text: '' }),
      ),
    )(acc),
  [],
);

// partial implem of Slate "built-in-constraints"
// https://docs.slatejs.org/concepts/11-normalizing#built-in-constraints
const normalize = (nodes, isRoot) => {
  if (isNilOrEmpty(nodes) && isRoot) {
    return richTextEmptyValue;
  }
  // contraint 4: Inline nodes cannot be the first or last child of a parent block,
  // nor can it be next to another inline node in the children array
  const normalizedInlineNodes =
    R.findIndex((n) => R.includes(n.type, inlineBlockTypes), nodes) === -1 ||
    isRoot
      ? nodes
      : normalizeInlineNodes(nodes);

  // constraint 5: The top-level editor node can only contain block nodes
  if (isRoot && Text.isText(R.head(nodes))) {
    return [{ type: blockTypes.paragraph, children: nodes }];
  }

  return R.map((node) => {
    // leaf, return as-is
    if (Text.isText(node)) {
      return node;
    }
    // contraint 1: All Element nodes must contain at least one Text descendant
    if (R.length(node.children) === 0) {
      return R.assoc('children', [{ text: '' }], node);
    }
    // constraint 5: The top-level editor node can only contain block nodes
    if (R.includes(node.type, inlineBlockTypes) && isRoot) {
      return { type: blockTypes.paragraph, children: normalize([node], false) };
    }
    return R.assoc('children', normalize(node.children, false), node);
  }, normalizedInlineNodes);
};

const deserialize = (el) => {
  if (el.nodeType === 3) {
    return el.textContent;
  }
  if (el.nodeType !== 1) {
    return null;
  }

  const children = R.map(deserialize, Array.from(el.childNodes));

  switch (el.nodeName) {
    case 'BODY':
    case 'DIV':
      return jsx('fragment', {}, children);
    case 'STRONG':
      return jsx('text', { [markTypes.bold]: true }, children);
    case 'EM':
      return jsx('text', { [markTypes.italic]: true }, children);
    case 'U':
      return jsx('text', { [markTypes.underline]: true }, children);
    case 'SUP':
      return jsx('text', { [markTypes.sup]: true }, children);
    case 'SUB':
      return jsx('text', { [markTypes.sub]: true }, children);
    case 'P':
      return jsx('element', { type: blockTypes.paragraph }, children);
    case 'H1':
      return jsx('element', { type: blockTypes.heading1 }, children);
    case 'H2':
      return jsx('element', { type: blockTypes.heading2 }, children);
    case 'LI':
      return jsx('element', { type: blockTypes.listItem }, children);
    case 'UL':
      return jsx('element', { type: blockTypes.bulletedList }, children);
    case 'OL':
      return jsx('element', { type: blockTypes.numberedList }, children);
    case 'A':
      return jsx(
        'element',
        {
          type: blockTypes.link,
          url: el.getAttribute('href'),
          target: el.getAttribute('target') || '_blank',
        },
        children,
      );
    case 'BR':
      return '\n';
    default:
      return el.textContent;
  }
};

export const htmlStringToSlate = (htmlString) => {
  if (isNilOrEmpty(htmlString)) {
    return richTextEmptyValue;
  }

  const doc = new window.DOMParser().parseFromString(htmlString, 'text/html');

  return normalize(deserialize(doc.body), true);
};
