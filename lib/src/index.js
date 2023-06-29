import '@fortawesome/fontawesome-svg-core/styles.css';

import './style/index.css';

export { default as RichText } from './components/RichText';
export {
  slateToHtmlString,
  htmlStringToSlate,
  slateToString,
} from './utils/richTextUtil';
export { richTextEmptyValue } from './constants';
