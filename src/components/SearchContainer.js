import React from "react";
import { Consumer } from "../context";

import Search from "./Search";

const SearchContainer = props => (
  <Consumer>
    {store => <Search stations={store.stations} history={props.history} />}
  </Consumer>
);

export default SearchContainer;
