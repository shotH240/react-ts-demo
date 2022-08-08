import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';

type Props = {}

type State = {}

export default class RouteMock extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>
        RouteMock
        <Outlet />
      </div>
    )
  }
}