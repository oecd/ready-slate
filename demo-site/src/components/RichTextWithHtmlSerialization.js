import { useState, useMemo } from 'react';
import beautify from 'js-beautify';

import { slateToHtmlString } from '@oecd-pac/ready-slate';

import RichText from './RichText';

const RichTextWithCountWordsFooter = () => {
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [
        {
          text: 'Here is a list:',
        },
      ],
    },
    {
      type: 'bulletedList',
      children: [
        {
          type: 'listItem',
          children: [
            {
              text: 'Item 1',
            },
          ],
        },
        {
          type: 'listItem',
          children: [
            {
              text: 'Item 2',
            },
          ],
        },
      ],
    },
  ]);

  const jsonString = useMemo(() => beautify(JSON.stringify(value)), [value]);

  const htmlString = useMemo(
    () => beautify.html(slateToHtmlString(value)),
    [value],
  );

  return (
    <div>
      <div>
        <RichText initialValue={value} setValue={setValue} />
      </div>
      <div className="flex">
        <div style={{ width: '50%', marginRight: '10px' }}>
          <div style={{ marginTop: '10px', fontSize: '0.8rem' }}>
            Internal state:
          </div>
          <pre
            style={{
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            <code>{jsonString}</code>
          </pre>
        </div>
        <div style={{ width: '50%' }}>
          <div style={{ marginTop: '10px', fontSize: '0.8rem' }}>
            Serialized to HTM (new lines and indentation are added for
            vlisibility):
          </div>
          <pre
            style={{
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            <code>{htmlString}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default RichTextWithCountWordsFooter;
