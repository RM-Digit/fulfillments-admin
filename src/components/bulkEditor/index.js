import React, { useState,  useEffect } from "react";
import Breadcrumbs from "./Breadcrumb";
import DataTable from "./dataTable";
import { useSelector } from "react-redux";
import { editable_columns ,default_columns} from "../../constants";
import { getValFromObj, getPrefix } from "../../utils/common";

export default function Index() {
  const [tableRows, setTableRows] = useState([]);
  const tableDatas = useSelector((state) => state.data.tableData);
  const view_ids = useSelector((state) => state.ui.view.ids);
  const [showBar, setShowBar] = useState(false);
  const [editColumns, setEditColumns] = useState([]);
  const [prefs, setPrefs] = useState({});

  const handleBarShow = (value) => {
    setShowBar(value);
  };
  useEffect(() => {
    tableDatas.length > 0 && getHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableDatas]);

  function getHandler() {
    const datas = tableDatas.map((tableData) => [
      tableData.id,
      tableData.sales_order.order_id,
    ]);
    const rows =
      view_ids.length > 0
        ? datas.filter((data) => view_ids.includes(data[0]))
        : datas;
    setTableRows(rows);

    var editableColumns = [];
    // eslint-disable-next-line array-callback-return
    tableDatas.map((data) => {
      var singleFields = {};
      // eslint-disable-next-line array-callback-return
      editable_columns.map((column) => {
        singleFields = {
          ...singleFields,
          [column]: getValFromObj(data, column),
        };
      });
    
      editableColumns[data.id] = singleFields;
      // editableColumns = { ...editableColumns, [data.id]: singleFields };
    });

    setEditColumns(editableColumns);
    var prefix = {};
    // eslint-disable-next-line array-callback-return
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
