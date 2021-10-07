import IndexTable from "./components/indexTable";
import { db } from "./components/firebase";
import { useState, useEffect } from "react";
// import Table from "@components/dataTable";
import { Page } from "@shopify/polaris";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    GetResponse();
  });

  const GetResponse = async () => {
    let rowData = [];
    const querySnapshot = await getDocs(collection(db, "delivery_attributes"));

    querySnapshot.forEach((doc) => {
      const tableData = doc.data();
      const row = {
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
    console.log("rowdata", rowData);
    setTableRows(rowData);
  };
  return (
    tableRows.length > 0 && (
      <Page>
        <IndexTable tableData={tableRows} perPage={15} />
      </Page>
    )
  );
};
export default Home;
