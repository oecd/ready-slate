export const markTypes = {
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  sup: 'sup',
  sub: 'sub',
};

export const blockTypes = {
  heading1: 'heading1',
  heading2: 'heading2',
  listItem: 'listItem',
  bulletedList: 'bulletedList',
  numberedList: 'numberedList',
  paragraph: 'paragraph',
  link: 'link',
};

export const formatTypes = {
  align: 'align',
  indent: 'indent',
};

export const alignTypes = {
  left: 'left',
  right: 'right',
  center: 'center',
  justify: 'justify',
};

export const defaultFormatValueByFormat = {
  [formatTypes.align]: alignTypes.left,
  [formatTypes.indent]: 0,
};

export const validBlockTypesByFormat = {
  [formatTypes.align]: [
    blockTypes.heading1,
    blockTypes.heading2,
    blockTypes.listItem,
    blockTypes.paragraph,
  ],
  [formatTypes.indent]: [
    blockTypes.heading1,
    blockTypes.heading2,
    blockTypes.listItem,
    blockTypes.paragraph,
  ],
};

export const listTypes = [blockTypes.bulletedList, blockTypes.numberedList];

export const inlineBlockTypes = [blockTypes.link];

export const richTextEmptyValue = [
  { type: 'paragraph', children: [{ text: '' }] },
];

export const toolbarItemTypes = {
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  sup: 'sup',
  sub: 'sub',
  heading1: 'heading1',
  heading2: 'heading2',
  bulletedList: 'bulleted-list',
  numberedList: 'numbered-list',
  link: 'link',
  alignLeft: 'align-left',
  alignRight: 'align-right',
  alignCenter: 'align-center',
  alignJustify: 'align-justify',
  indent: 'indent',
  outdent: 'outdent',
  separator: 'separator',
};
