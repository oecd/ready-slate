# ready-slate

Ready-to-use Slate-based RichText component for React.

<p align="center">
  <a href="#why"><strong>Why?</strong></a> ·
  <a href="https://..."><strong>Demo and examples</strong></a> ·
  <a href="#API"><strong>API</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a>
</p>

### Why?

The Richtext component provided by this package is not meant to be extensible (e.g.: allow to add a new formatting features/buttons via plugins, etc..), it is actually the opposite.

The goal being to provide an API, as simple and quick to use, as possible.
[Slate](https://github.com/ianstormtaylor/slate#readme) is great and offers a clean framework to build Richtext components but since it is a "framework", it is not "ready-to-use".
It will take you hours (or more likely days) to build even a simple production-ready Richtext.

On the other hand, if your requirements are basic like bold, italic,.. (see full feature list below), you can use ready-slate in minutes; all you need to do is:

`npm install @oecd-pac/ready-slate`

and then use the component:

```jsx
import React, { useState } from 'react';
import { RichText } from '@oecd-pac/ready-slate';

const App = () => {
  const [value, setValue] = useState(null);

  return (
    <RichText
      initialValue={value}
      setValue={setValue}
      toolbar={['bold', 'italic', 'sub', 'sup', 'separator', 'link']}
    />
  );
};

export default App;
```

### API

### Contributing

Even if ready-slate is not directly "extensible", feel free to add new features in this code base and propose PRs
