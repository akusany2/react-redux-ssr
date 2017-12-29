import React from 'react'
import { renderRoutes } from 'react-router-config'

import Header from './components/Header'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}