import React from 'react'
import { connect } from 'react-redux';

import { fetchApiData } from '../reducers/sample';

class SamplePage extends React.Component {
  static fetchData(store) {
    return store.dispatch(fetchApiData());
  }
  listSampleData() {
    this.props.sampleData.map(item => {
      console.log(item.show.name);
      return (
        <div>
          <h3>{item.show.name}</h3>
          {item.show.summary}
        </div>
      )
    })
  }
  render() {
    // console.log(this.props.sampleData)
    return (
      <div className='container mx-auto'>
        <h1>Sample page!!!</h1>
        <ul className='list-reset'>
          {this.props.sampleData.map(item => {
            return (
              <li key={item.show.id}>
                <h3>{item.show.name}</h3>
                <div dangerouslySetInnerHTML={{__html: item.show.summary}}></div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ sampleData: state.Sample.data1 });

export default connect(mapStateToProps)(SamplePage)