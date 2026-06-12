'use client';

import DemoBlock from './DemoBlock';
import RichText from './RichText';
import RichTextWithCountWordsFooter from './RichTextWithCountWordsFooter';
import RichTextWithHtmlSerialization from './RichTextWithHtmlSerialization';

const Home = () => (
  <div className="flex" style={{ justifyContent: 'center' }}>
    <div
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0px 20px 100px 20px',
      }}
    >
      <div className="flex" style={{ justifyContent: 'center' }}>
        <h1>ready-slate</h1>
      </div>

      <DemoBlock
        label="All options with hovering toolbar for text
        selection"
      >
        <RichText
          hoveringToolbar={['bold', 'italic', 'separator', 'link']}
          initialValue={[
            {
              type: 'heading2',
              children: [
                {
                  text: 'Lorem Ipsum',
                },
              ],
              align: 'center',
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
                  italic: true,
                },
              ],
              align: 'center',
            },
            {
              type: 'paragraph',
              align: 'center',
              children: [
                {
                  italic: true,
                  text: '"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."',
                  sub: true,
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Lorem ipsum',
                  bold: true,
                },
                {
                  text: ' dolor sit amet, consectetur adipiscing elit. Vestibulum scelerisque placerat convallis. Nullam quis pulvinar lectus. Cras suscipit ligula in bibendum condimentum. Vestibulum magna risus, finibus vel pharetra ac, tempor at erat. Phasellus placerat sagittis nisi, nec lobortis metus viverra eu. Donec in placerat arcu. Cras commodo feugiat vehicula. Integer in sem eget nulla molestie dictum sed nec diam. Sed vitae hendrerit augue. Quisque ut eros dignissim magna interdum consectetur. Duis volutpat magna at ullamcorper mollis.',
                },
              ],
            },
          ]}
        />
      </DemoBlock>

      <DemoBlock label="Just a few options">
        <RichText toolbar={['bold', 'italic', 'separator', 'link']} />
      </DemoBlock>

      <DemoBlock label="HTML serialization (slateToHtmlString)">
        <RichTextWithHtmlSerialization />
      </DemoBlock>

      <DemoBlock label="With placeholder">
        <RichText placeholder="Here is a placeholder" />
      </DemoBlock>

      <DemoBlock label="With footer (e.g. count words)">
        <RichTextWithCountWordsFooter />
      </DemoBlock>

      <DemoBlock label="SingleLine (prevent from adding new line on Enter / paste multi-lines)">
        <RichText singleLine />
      </DemoBlock>

      <DemoBlock label="Disabled">
        <RichText
          disabled
          initialValue={[
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Here a link to the package on ',
                },
                {
                  type: 'link',
                  url: 'https://www.npmjs.com/package/@oecd-pac/ready-slate',
                  target: '_blank',
                  children: [
                    {
                      text: 'npm',
                    },
                  ],
                },
              ],
            },
          ]}
        />
      </DemoBlock>

      <DemoBlock label="With overridden css classes">
        <RichText
          className="richtext-override"
          popperClassName="richtext-override"
          hoveringToolbar={['bold', 'italic', 'underline']}
        />
      </DemoBlock>

      <DemoBlock label="With predefined texts (nested menu)">
        <RichText
          predefinedTexts={[
            {
              title: 'Lorem Ipsum',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            },
            {
              title: 'Symbols and spacing',
              items: [
                { title: 'Trademark', text: '™' },
                { title: 'Spaced tildes', text: ' ~~ ' },
              ],
            },
            { type: 'separator' },
            {
              title: 'Entities',
              items: [
                { title: 'nbsp + right guillemet', text: '&#160;&#187;' },
                {
                  title: 'left nbsp TM nbsp right',
                  text: '&#171;&#160;&#8482;&#160;&#187;',
                },
              ],
            },
            { type: 'separator' },
            {
              title: 'Snippets',
              items: [
                {
                  title: 'Inline markup',
                  text: 'Hello <b>world</b>, this is <i>rich</i> text.',
                },
                {
                  title: 'Block without paragraph',
                  text: '<ul><li>First</li><li>Second</li></ul>',
                },
                {
                  title: 'Block with paragraph',
                  text: '<p><strong>Intro:</strong> choose an item</p><ul><li>One</li><li>Two</li></ul>',
                },
              ],
            },
          ]}
        />
      </DemoBlock>
    </div>
  </div>
);

export default Home;
