import React, { useCallback, useState, useEffect } from "react";
import { Card, Tabs } from "@shopify/polaris";
import { useDispatch } from "react-redux";
import { fetchAll } from "../_actions/firestore_actions";
import Main from "./main";
import Delivery from "./delivery";
import SpecialNote from "./specialNote";
import Tobbar from "../components/topbar";
import { connect, useSelector } from "react-redux";
import BulkEditor from "./bulkEditor";

function Index() {
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  const view = useSelector((state) => state.ui.view.mode);

  const handleTabChange = useCallback(
    (selectedTabIndex) => {
      localStorage.removeItem('order_id');
      setSelected(selectedTabIndex)
    },
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

  return view === "main" ? (
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
  ) : (
    <BulkEditor />
  );
}
export default connect(
  (state, ownProps) => (
    {
      user: state.user,
      ui: state.ui,
      data: state.data, // eslint-disable-next-line no-sequences
    },
    {
      fetchAll,
    }
  )
)(Index);
