# ready-slate

Ready-to-use Slate-based RichText component for React.

<p align="center">
  <a href="#why"><strong>Why?</strong></a> ·
  <a href="https://coming-soon"><strong>Demo and examples</strong></a> ·
  <a href="#api"><strong>API</strong></a> ·
  <a href="#Style"><strong>Style</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a>
</p>

### Why?

The RichText component provided by this package is not meant to be extensible (e.g.: allowing to add a new formatting features/buttons via plugins, etc..), it is actually the opposite.

The goal being to provide an API, as simple and quick to use, as possible.
[Slate](https://github.com/ianstormtaylor/slate#readme) is great and offers a clean framework to build RichText components but since it is a "framework", it is not "ready-to-use".
It will take you hours (or more likely days) to build even a simple production-ready RichText.

On the other hand, if your requirements are basic like bold, italic,.. (see full feature list [below](#api), in the toolbar prop), you can use `ready-slate` in minutes; all you need to do is:

`npm install @oecd-pac/ready-slate`

and then use the component:

```jsx
import React, { useState } from 'react';
import { RichText, richTextEmptyValue } from '@oecd-pac/ready-slate';

const App = () => {
  const [value, setValue] = useState(richTextEmptyValue);

  return (
    <RichText
      initialValue={value}
      setValue={setValue}
      toolbar={['bold', 'italic', 'separator', 'link']}
    />
  );
};

export default App;
```

### API

RichText

| **Props**           | **Description**                                                                                                                                                                                                                                                                                                | **Type**               | **Required** | **Default** |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------ | ----------- |
| initialValue        | Initial value. You do not need to know the internal format and can pass `richTextEmptyValue` if you do not have an existing value to provide                                                                                                                                                                   | array                  | yes          |             |
| setValue            | A function that will be called passing the current value                                                                                                                                                                                                                                                       | func                   | yes          |             |
| toolbar             | Array of formatting options for the toolbar. Possible values: '`bold`', '`italic`', '`underline`', '`sup`', '`sub`', '`heading1`', '`heading2`', '`bulleted-list`', '`numbered-list`', '`link`', '`align-left`', '`align-right`', '`align-center`', '`align-justify`', '`indent`', '`outdent`', '`separator`', | array                  |              | []          |
| hoveringToolbar     | Array of formatting options for the hovering toolbar (same options than for toolbar)                                                                                                                                                                                                                           | array                  |              | []          |
| placeholder         | RichText placeholder                                                                                                                                                                                                                                                                                           | string                 |              | ''          |
| singleLine          | Prevent user from creating new paragraph by pressing Enter                                                                                                                                                                                                                                                     | bool                   |              | false       |
| onBlur              | A custom onBlur function                                                                                                                                                                                                                                                                                       | func                   |              | null        |
| editorFooterContent | Custom footer content                                                                                                                                                                                                                                                                                          | node or array of nodes |              | null        |
| disabled            | Disable the RichText                                                                                                                                                                                                                                                                                           | bool                   |              | false       |
| className           | RichText custom css class (mainly useful to override default style)                                                                                                                                                                                                                                            | string                 |              | ''          |
| popperClassName     | Popper (hovering toolbar, link form) custom css class (mainly useful to override default style)                                                                                                                                                                                                                | string                 |              | ''          |

On top of the RichText component, `ready-slate` exports a few useful helper functions and constants:

Functions:

- slateToHtmlString: serialize internal value to html
- htmlStringToSlate: deserialize html to internal value
- slateToString: serialize internal value to string

Constants

- richTextEmptyValue: internal empty value (can be compared against to know if the RichText is "empty")

### Style

The RichText component comes with a very neutral style but if you wish to change certain details you can pass a custom className (or popperClassName) that will allow to have more precise css selectors. Then simply inspect the classes you want to override and declare your own classes.

### Contributing

Even if ready-slate is not directly "extensible", feel free to add new features in this code base and propose PRs
