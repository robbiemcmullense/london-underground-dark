import React from "react";
import { Link } from "react-router-dom";
import { List } from "antd";

const StationList = props => {
  return (
    <List
      style={{ overflowY: "auto" }}
      size="large"
      itemLayout="horizontal"
      dataSource={props.stations}
      renderItem={item => (
        <List.Item key={item.naptanId} style={{ paddingLeft: "20px" }}>
          <Link to={`/station/${item.naptanId}`}>{item.commonName}</Link>
        </List.Item>
      )}
    />
  );
};

export default StationList;
