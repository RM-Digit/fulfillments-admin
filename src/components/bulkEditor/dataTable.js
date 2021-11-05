import React, { useState, useCallback, useEffect } from "react";
import {
  Frame,
  Card,
  ChoiceList,
  DataTable,
  Filters,
  FooterHelp,
  Pagination,
  Autocomplete,
  TextField,
  ContextualSaveBar,
} from "@shopify/polaris";
import { editable_columns, delivery_zone ,shipping_method} from "../../constants";
import { useDispatch } from "react-redux";
import { arrToArrObj } from "../../utils/common";
import { bulkUpdateFields } from "../../_actions/firestore_actions";
import { toggleToast } from "_actions/ui_actions";

export default function Index({
  tableData,
  perPage,
  getShowBar,
  editColumns,
  prefix,
  default_columns,
}) {
  const dispatch = useDispatch();
  const [saveBarShow, setSaveBarShow] = useState(false);
  const [appliedFields, setAppliedFields] = useState([]);
  const [selected, setSelected] = useState(default_columns);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [tableRows, setTableRows] = useState([]);
  const [tableHeading, setTableHeading] = useState(["order_id"]);
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (value) => {
    setSelected(value);
  };

  useEffect(() => {
    setSaveBarShow(Object.keys(value).length > 0);
  }, [value])

  const handleFieldChange = (id, field, val) => {
    const temp = {
      [id]: {
        ...value[id],
        [field]: val,
      },
    };
    setValue({ ...value, ...temp });
  };

  const handleDiscard = () => {
    setSaveBarShow(false);
  };

  const handleSave = () => {
    setLoading(true);
    dispatch(bulkUpdateFields(value, prefix)).then((res) => {
      setSaveBarShow(false);
      setLoading(false);
      dispatch(toggleToast());
      setValue({});
    });
  };

  useEffect(() => {
    getShowBar(saveBarShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveBarShow]);

  useEffect(() => {
    var initial_data = tableData;
    const pageData = initial_data.filter(
      (row, index) =>
        index >= (currentPage - 1) * perPage && index < currentPage * perPage
    );
    var headers = ["order_id"];
    // eslint-disable-next-line array-callback-return
    appliedFields.map((field) => {
      headers.push(field.key);
      setTableHeading(headers);

    });

    const rows = pageData.map((row) => {
      const fields = appliedFields.map((field) => {
        const textField = (
          <Autocomplete.TextField
            value={
              value[row[0]]
                ? value[row[0]][field.key]
                  ? value[row[0]][field.key]
                  : editColumns[row[0]][field.key]
                : editColumns[row[0]][field.key]
            }
            onChange={(val) => handleFieldChange(row[0], field.key, val)}
          />
        );

        if (field.key === "delivery_zone" || field.key === "shipping_method") {
          return <Autocomplete
            options={field.key === "delivery_zone"?delivery_zone:shipping_method}
            selected={field.key === "delivery_zone"?delivery_zone:shipping_method}
            onSelect={(val) => handleFieldChange(row[0], field.key, val[0])}
            textField={textField}
          />
        } else return <TextField
          value={
            value[row[0]]
              ? value[row[0]][field.key]
                ? value[row[0]][field.key]
                : editColumns[row[0]][field.key]
              : editColumns[row[0]][field.key]
          }
          onChange={(val) => handleFieldChange(row[0], field.key, val)}
        />

      });
      return [row[1]].concat(fields);
    });

    setTotal(initial_data.length);
    setTableRows(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData, currentPage, appliedFields, value]);

  useEffect(() => {
    if (selected.length > 0) {

      const fields = selected.map((val) => ({
        key: val,
        label: val,
        onRemove: handleRemoveFields,
      }));
      setAppliedFields(fields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, selected.length > 0]);

  const handleRemoveFields = useCallback((value) => {
    setAppliedFields((appliedFields) =>
      appliedFields.filter((applied) => applied.key !== value)
    );
    setSelected((selected) => selected.filter((row) => row !== value));
  }, []);

  const filters = [
    {
      key: "editable_fields",
      label: "Add Fields",
      filter: (
        <ChoiceList
          title="Editable Fields"
          titleHidden
          choices={arrToArrObj(editable_columns)}
          selected={selected || []}
          onChange={handleChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];
  return (
    <div style={{ marginTop: "20px" }}>
      <Frame>
        {saveBarShow && (
          <ContextualSaveBar
            message="Unsaved changes"
            saveAction={{
              onAction: handleSave,
              loading: loading,
            }}
            discardAction={{
              onAction: handleDiscard,
            }}
          />
        )}

        <Card>
          <Card.Section>
            <Filters
              hideQueryField
              filters={filters}
              appliedFilters={appliedFields}
            // onClearAll={handleFiltersClearAll}
            />
          </Card.Section>
          <DataTable
            columnContentTypes={["text", "text"]}
            headings={tableHeading}
            rows={tableRows}
          />
          <FooterHelp>
            <Pagination
              label={`${(currentPage - 1) * perPage}-${total > currentPage * perPage - 1
                  ? currentPage * perPage - 1
                  : total
                } of total ${total}`}
              hasPrevious={currentPage > 1}
              onPrevious={() => {
                setCurrentPage((currentPage) => currentPage - 1);
              }}
              hasNext={total > currentPage * perPage}
              onNext={() => {
                setCurrentPage((currentPage) => currentPage + 1);
              }}
            />
          </FooterHelp>
        </Card>
      </Frame>
    </div>
  );
}
