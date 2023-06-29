/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';

import { RichText, richTextEmptyValue } from '@oecd-pac/ready-slate';

const CustomRichText = ({
  initialValue = richTextEmptyValue,
  toolbar = [
    'bold',
    'italic',
    'underline',
    'separator',
    'sup',
    'sub',
    'separator',
    'heading1',
    'heading2',
    'separator',
    'bulleted-list',
    'numbered-list',
    'separator',
    'align-left',
    'align-right',
    'align-center',
    'align-justify',
    'separator',
    'indent',
    'outdent',
    'separator',
    'link',
  ],
  ...otherProps
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <RichText
      initialValue={value}
      setValue={setValue}
      toolbar={toolbar}
      {...otherProps}
    />
  );
};

export default CustomRichText;
