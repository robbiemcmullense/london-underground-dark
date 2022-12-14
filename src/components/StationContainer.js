import React, { Component } from "react";
import Station from "./Station";
import { Spin } from "antd";

export default class StationContainer extends Component {
  componentDidMount() {
    const { match, setCurrentStation } = this.props;
    setCurrentStation(match.params.naptanId);
  }

  componentWillUnmount() {
    this.props.resetCurrent();
  }

  render() {
    const {
      currentStation,
      currentArrivals,
      loadingCurrentStation,
      loadingCurrentArrivals,
      favouritedStations,
      toggleFavourite
    } = this.props;
    return loadingCurrentStation || loadingCurrentArrivals ? (
      <Spin className="app__loader" size="large" tip="Loading..." />
    ) : (
      <Station
        toggleFavourite={toggleFavourite}
        station={currentStation}
        arrivals={currentArrivals}
        isFavourited={favouritedStations.includes(currentStation)}
      />
    );
  }
}
