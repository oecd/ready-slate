import { useState, useMemo } from 'react';
import * as R from 'ramda';

import { slateToString } from '@oecd-pac/ready-slate';

import RichText from './RichText';

const RichTextWithCountWordsFooter = () => {
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [
        {
          text: 'Words are counted!',
        },
      ],
    },
  ]);

  const wordsCount = useMemo(
    () =>
      R.compose(
        R.ifElse(
          R.gt(R.__, 1),
          (wc) => `${wc} words`,
          (wc) => `${wc} word`,
        ),
        R.length,
        R.reject(R.isEmpty),
        R.split(' '),
        slateToString,
      )(value),
    [value],
  );

  return (
    <RichText
      initialValue={value}
      setValue={setValue}
      editorFooterContent={
        <div
          className="flex"
          style={{ justifyContent: 'flex-end', color: '#999999' }}
        >
          {wordsCount}
        </div>
      }
    />
  );
};

export default RichTextWithCountWordsFooter;
