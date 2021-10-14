import IndexTable from "../components/indexTable";

import { useState, useEffect } from "react";
import { Page } from "@shopify/polaris";
import { useSelector } from "react-redux";

const Index = () => {
  const [tableRows, setTableRows] = useState([]);
  const tableDatas = useSelector((state) => state.data.tableData);

  const keys = [
    "order_id",
    "data_created",
    "fulfillment_id",
    "ship_date",
    "delivery_date",
    "contact_email",
    "fulfillment_status",
  ];
  const prefix = {
    contact_email: "delivery_address",
  };
  const tableHeader = [
    { title: "Order ID" },
    { title: "Order Date" },
    { title: "Fulfillment ID" },
    { title: "Ship Date" },
    { title: "Delivery Date" },
    { title: "Contact Email" },
    { title: "Fulfillment Status" },
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
        data_created: tableData.sales_order.created.toDate().toDateString(),
        fulfillment_id: tableData.fulfillment_id,
        ship_date: tableData.ship_date.toDate().toDateString(),
        delivery_date: tableData.delivery_date.toDate().toDateString(),
        contact_email: tableData.delivery_address.contact_email,
        fulfillment_status: tableData.fulfillment_status,
      };

      rowData.push(row);
    });
    setTableRows(rowData);
  };

  return (
    tableRows.length > 0 && (
      <Page>
        <IndexTable
          tableTitle="All Fulfillments Data"
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
