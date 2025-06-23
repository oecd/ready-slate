# ready-slate

Ready-to-use Slate-based RichText component for React.

<p align="center">
  <a href="#why"><strong>Why?</strong></a> ·
  <a href="https://oecd.github.io/ready-slate/" target="_blank"><strong>Demo and examples</strong></a> ·
  <a href="#api"><strong>API</strong></a> ·
  <a href="#Style"><strong>Style</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a>
</p>

### Why?

The RichText component provided by this package is not meant to be extensible (e.g. allowing to add a new formatting features/buttons via plugins, etc.), it is actually quite the opposite.

The goal is to provide an API that can be used as simply and quickly as possible.
[Slate](https://github.com/ianstormtaylor/slate#readme) is great and offers a clean framework to build RichText components but since it is a "framework", it is not ready to use out of the box.
It will take you hours (or more likely days) to build even a simple production-ready RichText.

On the other hand, if your requirements are basic like bold, italic, ... (see full feature list [below](#api), in the toolbar prop), you can use `ready-slate` in minutes; all you need to do is:

`npm install @oecd-pac/ready-slate`

and then use the component:

```jsx
import React, { useState } from "react";
import { RichText, richTextEmptyValue } from "@oecd-pac/ready-slate";

const App = () => {
  const [value, setValue] = useState(richTextEmptyValue);

  return (
    <RichText
      initialValue={value}
      setValue={setValue}
      toolbar={["bold", "italic", "separator", "link", "predefined-texts"]}
      predefinedTexts={[
        { title: 'Greeting', text: 'Hello <b>world!</b>' },
        { title: 'Phrase', text: 'This is a <i>predefined</i> phrase.' },
        { title: 'Snippet', text: '<ul><li>First</li><li>Second</li></ul>' },
      ]}
    />
  );
};

export default App;
```

### API

RichText

| **Props**             | **Description**                                                                                                                                                                                                                                                                                                | **Type**               | **Required** | **Default** |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------ | ----------- |
| `initialValue`        | Initial value. You do not need to know the internal format and can pass `richTextEmptyValue` if you do not have an existing value to provide                                                                                                                                                                   | array                  | yes          |             |
| `setValue`            | A function that will be called passing the current value                                                                                                                                                                                                                                                       | func                   | yes          |             |
| `toolbar`             | Array of formatting options for the toolbar. Possible values: '`bold`', '`italic`', '`underline`', '`sup`', '`sub`', '`heading1`', '`heading2`', '`bulleted-list`', '`numbered-list`', '`link`', '`align-left`', '`align-right`', '`align-center`', '`align-justify`', '`indent`', '`outdent`', '`separator`', '`predefined-texts`' | array                  |              | []          |
| `hoveringToolbar`     | Array of formatting options for the hovering toolbar (same options than for toolbar)                                                                                                                                                                                                                           | array                  |              | []          |
| `predefinedTexts`     | Array of objects for predefined texts to insert. Each object should have a `title` (string) and a `text` (string, can include HTML markup). When the `predefined-texts` toolbar option is enabled, a dropdown will allow inserting these texts at the cursor position.                                   | array of objects       |              | []          |
| `placeholder`         | RichText placeholder                                                                                                                                                                                                                                                                                           | string                 |              | ''          |
| `singleLine`          | Prevent user from creating new paragraph by pressing Enter                                                                                                                                                                                                                                                     | bool                   |              | false       |
| `onBlur`              | A custom onBlur function                                                                                                                                                                                                                                                                                       | func                   |              | null        |
| `editorFooterContent` | Custom footer content                                                                                                                                                                                                                                                                                          | node or array of nodes |              | null        |
| `disabled`            | Disable the RichText                                                                                                                                                                                                                                                                                           | bool                   |              | false       |
| `className`           | RichText custom css class (mainly useful to override default style)                                                                                                                                                                                                                                            | string                 |              | ''          |
| `popperClassName`     | Popper (hovering toolbar, link form) custom css class (mainly useful to override default style)                                                                                                                                                                                                                | string                 |              | ''          |

On top of the RichText component, `ready-slate` exports a few useful helper functions and constants:

Functions:

- `slateToHtmlString`: serialize internal value to HTML
- `htmlStringToSlate`: deserialize HTML to internal value
- `slateToString`: serialize internal value to string

Constants

- `richTextEmptyValue`: internal empty value (can be compared against to know if the RichText is "empty")

### Style

The RichText component comes with very neutral styling but if you wish to change certain details you can pass a custom className (or popperClassName) that will allow to have more precise css selectors. Then simply inspect the classes you want to override and declare your own classes.

### Contributing

Even though ready-slate is not directly "extensible", feel free to add new features to the code base and propose PRs.
