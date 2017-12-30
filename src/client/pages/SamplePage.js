import React from 'react'
import { connect } from 'react-redux';

import { fetchApiData } from '../reducers/sample';

class SamplePage extends React.Component{
  static fetchData(store) {
    return store.dispatch(fetchApiData());
  }
  render() {
    return (
      <div>
        <h1>Sample page!!!</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ sampleData: state.Sample.data1 });

export default connect(mapStateToProps)(SamplePage)