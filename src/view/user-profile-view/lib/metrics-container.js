import { connect } from 'react-redux';
import Metrics from './metrics';

const MetricsContainer = connect(
  state => ({
    ...state,
  }),
)(Metrics);

export default MetricsContainer;
