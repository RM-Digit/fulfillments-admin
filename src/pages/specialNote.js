import IndexTable from "../components/indexTable";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Page } from "@shopify/polaris";

const Index = () => {
  const [tableRows, setTableRows] = useState([]);
  const tableDatas = useSelector((state) => state.data.tableData);
  const keys = [
    "order_id",
    "notes",
    "special_requests",
    "contact_email",
    "contact_phone",
  ];
  const prefix = {
    contact_email: "delivery_address",
    contact_phone: "delivery_address",
  };
  const tableHeader = [
    { title: "Order ID" },
    { title: "Notes" },
    { title: "Special Requests ID" },
    { title: "Contact Email" },
    { title: "Contact Phone" },
  ];
  useEffect(() => {
    tableDatas && GetResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableDatas]);

  const GetResponse = async () => {
    let rowData = [];
    tableDatas.forEach((tableData) => {
      const row = {
        id: tableData.id,
        order_id: tableData.sales_order.order_id,
        notes: tableData.notes,
        special_requests: tableData.special_requests,
        contact_email: tableData.delivery_address.contact_email,
        contact_phone: tableData.delivery_address.contact_phone,
      };

      rowData.push(row);
    });
    setTableRows(rowData);
  };

  return (
    tableRows.length > 0 && (
      <Page>
        <IndexTable
          tableTitle="Special Notes"
          tableHeader={tableHeader}
          tableData={tableRows}
          perPage={15}
          keys={keys}
          prefix={prefix}
        />
      </Page>
    )
  );
};
export default Index;
