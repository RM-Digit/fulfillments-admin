import React from "react";
import { Card, Page } from "@shopify/polaris";
import Tobbar from "../components/topbar";
import BulkEditor from "../components/bulkEditor";

export default function index() {
  return (
    <Card>
      <Tobbar />
      <Page>
        <BulkEditor />
      </Page>
    </Card>
  );
}
