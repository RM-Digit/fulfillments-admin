import IndexTable from "../components/indexTable";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Page } from "@shopify/polaris";

const Index = () => {
  const [tableRows, setTableRows] = useState([]);
  const tableDatas = useSelector((state) => state.data.tableData);
  const keys = [
    "order_id",
    "shipping_method",
    "delivery_zone",
    "service_time",
    "business_indicator",
    "delivery_hours",
  ];
  const prefix = {
    shipping_method: "delivery_attributes",
    delivery_zone: "delivery_attributes",
    service_time: "delivery_attributes",
    delivery_hours: "delivery_attributes",
  };
  const tableHeader = [
    { title: "Order ID" },
    { title: "Shipping Method" },
    { title: "Delivery Zone" },
    { title: "Service Time" },
    { title: "Business Indicator" },
    { title: "Delivery Hours" },
  ];
  useEffect(() => {
    tableDatas && GetResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableDatas]);
  const GetResponse = async () => {
    let rowData = [];

    tableDatas.forEach((doc) => {
      const tableData = doc.delivery_attributes;
      const row = {
        id: doc.id,
        order_id: doc.sales_order.order_id,
        shipping_method: tableData.shipping_method,
        delivery_zone: tableData.delivery_zone,
        service_time: tableData.service_time,
        business_indicator: tableData.business_indicator,
        delivery_hours: tableData.delivery_hours,
      };

      rowData.push(row);
    });
    setTableRows(rowData);
  };

  return (
    tableRows.length > 0 && (
      <Page>
        <IndexTable
          tableTitle="Delivery Attributes"
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
