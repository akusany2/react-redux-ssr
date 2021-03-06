import React from 'react'
import { Helmet } from 'react-helmet';

export default class HomePage extends React.Component{
  head() {
    return (
      <Helmet>
        <title>Homepage!</title>
        <meta property="og:title" content="Home page" />
      </Helmet>
    )
  }
  render() {
    return (
      <div>
        {this.head()}
        <h1>Home page !!</h1>
      </div>
    )
  }
}