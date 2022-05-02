import PropTypes from 'prop-types';

import '../assets/style.css';

const App = ({ Component }) => <Component />;

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
