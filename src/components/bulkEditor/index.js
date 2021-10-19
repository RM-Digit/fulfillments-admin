import React, { useState, useCallback, useEffect } from "react";
import Breadcrumbs from "./Breadcrumb";
import DataTable from "./dataTable";
import { useSelector } from "react-redux";
import { editable_columns } from "../../constants";
import { getValFromObj, getPrefix } from "../../utils/common";

export default function Index() {
  const [tableRows, setTableRows] = useState([]);
  const tableDatas = useSelector((state) => state.data.tableData);
  const [showBar, setShowBar] = useState(false);
  const [editColumns, setEditColumns] = useState([]);
  const [prefs, setPrefs] = useState({});

  const default_columns = ["shipping_method", "service_time", "contact_email"];

  const handleBarShow = (value) => {
    setShowBar(value);
  };
  useEffect(() => {
    !tableDatas && (window.location.href = "/");
    getHander();
  }, []);

  function getHander() {
    const datas = tableDatas.map((tableData) => [
      tableData.id,
      tableData.sales_order.order_id,
    ]);
    setTableRows(datas);
    var editableColumns;

    tableDatas.map((data) => {
      var singleFields = {};

      editable_columns.map((column) => {
        singleFields = {
          ...singleFields,
          [column]: getValFromObj(data, column),
        };
      });

      editableColumns = { ...editableColumns, [data.id]: singleFields };
    });

    setEditColumns(editableColumns);
    var prefix = {};
    editable_columns.map((column) => {
      prefix = {
        ...prefix,
        [column]: getPrefix(tableDatas[0], column),
      };
    });
    setPrefs(prefix);
  }

  return (
    <div>
      <Breadcrumbs setShowBar={showBar} />
      <DataTable
        tableData={tableRows}
        perPage={10}
        getShowBar={handleBarShow}
        editColumns={editColumns}
        prefix={prefs}
        default_columns={default_columns}
      />
    </div>
  );
}
