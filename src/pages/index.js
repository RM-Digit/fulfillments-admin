import React, { useCallback, useState, useEffect } from "react";
import { Card, Tabs, ActionList, Button, Popover } from "@shopify/polaris";
import { useDispatch } from "react-redux";
import { fetchAll } from "../_actions/firestore_actions";
import Main from "./main";
import Delivery from "./delivery";
import SpecialNote from "./specialNote";
import Tobbar from "../components/topbar";
import { connect } from "react-redux";
function Index() {
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );
  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const Components = [<Main />, <Delivery />, <SpecialNote />];
  const tabs = [
    {
      id: "main",
      content: "All",
      panelID: "main-panel",
    },
    {
      id: "delivery",
      content: "Delivery Attributes",
      panelID: "delivery-panel",
    },
    {
      id: "special",
      content: "Special Notes",
      panelID: "special-panel",
    },
  ];

  return (
    <Card>
      <Tobbar />
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabChange}
        disclosureText="More views"
      >
        <Card.Section>{Components[selected]}</Card.Section>
      </Tabs>
    </Card>
  );
}
export default connect(
  (state, ownProps) => (
    {
      user: state.user,
      data: state.data,
    },
    {
      fetchAll,
    }
  )
)(Index);
