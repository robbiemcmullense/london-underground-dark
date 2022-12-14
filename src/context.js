import React, { Component } from "react";
import { fetchStations, fetchArrivalsByLine } from "./utils/api";

const Context = React.createContext();

class Provider extends Component {
  state = {
    loadingStations: true,
    stations: [],
    loadingCurrentStation: true,
    currentStation: null,
    loadingCurrentArrivals: true,
    currentArrivals: null,
    loadingFavourited: true,
    favouritedStations: []
  };

  toggleFavourite = station => {
    this.setState(lastState => {
      const { favouritedStations } = lastState;
      if (favouritedStations.includes(station)) {
        return {
          favouritedStations: lastState.favouritedStations.filter(
            item => item !== station
          )
        };
      }
      return {
        favouritedStations: [...lastState.favouritedStations, station]
      };
    });
  };

  resetCurrent = () => {
    this.setState(() => ({
      loadingCurrentArrivals: true,
      loadingCurrentStation: true
    }));
  };

  async componentDidMount() {
    const stations = await fetchStations();
    this.setState(() => ({ stations, loadingStations: false }));
  }

  setCurrentStation = naptanId => {
    const currentStation = this.getStation(naptanId);
    this.setState(
      () => ({ currentStation, loadingCurrentStation: false }),
      () => this.setCurrentArrivals()
    );
  };

  setCurrentArrivals = () => {
    const { currentStation } = this.state;
    this.setArrivalsByLines(
      this.getLineIdentifiers(currentStation),
      currentStation
    );
  };

  setArrivalsByLines = async (lineIdentifiers, station) => {
    const arrivals = await Promise.all(
      lineIdentifiers.map(lineId =>
        fetchArrivalsByLine(lineId, station.naptanId)
      )
    );

    const arrivalsByLines = arrivals.reduce((accum, array) => {
      return array.length === 0
        ? accum
        : { ...accum, [array[0].lineName]: array };
    }, {});

    Object.keys(arrivalsByLines).forEach(key => {
      arrivalsByLines[key] = arrivalsByLines[key].reduce((accum, arrival) => {
        return {
          ...accum,
          [arrival.platformName]: (accum[arrival.platformName]
            ? [...accum[arrival.platformName]]
            : []
          ).concat(arrival)
        };
      }, {});
    });

    this.setState(() => ({
      currentArrivals: arrivalsByLines,
      loadingCurrentArrivals: false
    }));
  };

  getStation = naptanId =>
    this.state.stations.find(station => station.naptanId === naptanId);

  getLineIdentifiers = station =>
    station.lineModeGroups.find(group => group.modeName === "tube")
      .lineIdentifier;

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          setCurrentStation: this.setCurrentStation,
          resetCurrent: this.resetCurrent,
          toggleFavourite: this.toggleFavourite
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

const Consumer = Context.Consumer;

export { Provider, Consumer };
