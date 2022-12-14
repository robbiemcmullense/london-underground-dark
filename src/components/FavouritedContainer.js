import React, { Component } from 'react'
import {Consumer} from '../context'
import StationList from "./StationList";

export default class FavouritedContainer extends Component {
  render() {
    return (
      <Consumer>
      {store => <StationList stations={store.favouritedStations} />}
      </Consumer>
    )
  }
}
