import NextHead from 'next/head';

import DemoBlock from '../components/DemoBlock';
import RichText from '../components/RichText';
import RichTextWithCountWordsFooter from '../components/RichTextWithCountWordsFooter';
import RichTextWithHtmlSerialization from '../components/RichTextWithHtmlSerialization';

const Home = () => (
  <>
    <NextHead>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1.0"
      />
      <title>Ready-slate</title>
    </NextHead>
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

        <DemoBlock label="With predefined texts (insert from dropdown)">
          <RichText
            predefinedTexts={[
              { title: 'Greeting', text: 'Hello <b>world!</b>' },
              { title: 'Phrase', text: 'This is a <i>predefined</i> phrase.' },
              {
                title: 'Snippet',
                text: '<ul><li>First</li><li>Second</li></ul>',
              },
              {
                title: 'Simple text',
                text: 'not an html string',
              },
            ]}
          />
        </DemoBlock>
      </div>
    </div>
  </>
);

export default Home;
