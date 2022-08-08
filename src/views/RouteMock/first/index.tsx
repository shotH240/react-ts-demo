import React, { Component } from 'react'
import { useParams } from 'react-router-dom';

type Props = {}

type State = {}

export default class First extends Component<Props, State> {
  
  state = {}
  componentDidMount() {
    console.log('first-cmdff===', this.props)
  }
  render() {
    return (
      <div>First=====</div>
    )
  }
}