import React, { useCallback, useState, useEffect } from "react";
import CsvDownloader from "react-csv-downloader";
import { useDispatch, useSelector } from "react-redux";
import { editable_columns } from "../constants";
import { changeText, dateRangeChecker } from "../utils/common";
import { toggleToast } from "_actions/ui_actions";

import {
  useIndexResourceState,
  Card,
  ChoiceList,
  Filters,
  IndexTable,
  Select,
  TextField,
  TextStyle,
  DatePicker,
  Subheading,
  Pagination,
  FooterHelp,
  Button,
  Modal,
  Link,
} from "@shopify/polaris";
import ReactHover, { Trigger, Hover } from "react-hover";
import { updateFields, updateSignleField } from "../_actions/firestore_actions";

const optionsCursorTrueWithMargin = {
  followCursor: false,
};

export default function Index({
  tableHeader,
  tableTitle,
  tableData,
  perPage,
  keys,
  prefix,
}) {
  const fulfillments = useSelector((state) => state.data.tableData);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [taggedWith, setTaggedWith] = useState("");
  const [queryValue, setQueryValue] = useState(null);
  const [sortValue, setSortValue] = useState("");
  const [status, setStatus] = useState([]);
  const [needsReview, setNeedsReview] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deliveryZoneOptions, setDeliveryZoneOptions] = useState([]);
  const [deliveryZone, setDeliveryZone] = useState("");
  const [shippingMethodOptions, setShippingMethodOptions] = useState([]);
  const [shippingMethod, setShippingMethod] = useState("");
  const [{ order_month, order_year }, setOrderCalendar] = useState({
    order_month: 9,
    order_year: 2021,
  });
  const [{ ship_month, ship_year }, setShipCalendar] = useState({
    ship_month: 9,
    ship_year: 2021,
  });
  const [{ delivery_month, delivery_year }, setDeliveryCalendar] = useState({
    delivery_month: 9,
    delivery_year: 2021,
  });
  const [{ bulk_ship_month, bulk_ship_year }, setBulkShipCalendar] = useState({
    bulk_ship_month: 9,
    bulk_ship_year: 2021,
  });
  const [value, setValue] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(null);

  const [orderDate, setOrderDate] = useState(null);
  const [shipDate, setShipDate] = useState(null);
  const [bulkShipDate, setBulkShipDate] = useState({
    start: new Date(),
    end: new Date(),
  });

  useEffect(() => {
    let delivery_zones = [{ label: "- Select One -", value: null }];
    var compare_zone = [];
    fulfillments.forEach((fulfillment, index) => {
      const zone = fulfillment.delivery_attributes.delivery_zone;
      if (!compare_zone.includes(zone)) {
        compare_zone.push(zone);
        delivery_zones.push({
          label: zone,
          value: zone,
        });
      }
    });

    setDeliveryZoneOptions(delivery_zones);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDeliveryZoneOptions, fulfillments]);

  useEffect(() => {
    let shipping_methods = [{ label: "- Select One -", value: null }];
    var compare_method = [];
    fulfillments.forEach((fulfillment) => {
      const method = fulfillment.delivery_attributes.shipping_method;

      if (!compare_method.includes(method)) {
        compare_method.push(method);
        shipping_methods.push({
          label: method,
          value: method,
        });
      }
    });

    setShippingMethodOptions(shipping_methods);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setShippingMethodOptions, fulfillments]);

  useEffect(() => {
    var initial_data = tableData;

    if (queryValue) {
      const filtered_rows = fulfillments.filter(
        (row) =>
          row.sales_order.order_id.toString().includes(queryValue) ||
          row.delivery_address.contact_email.includes(queryValue)
      );
      initial_data = tableData.filter(
        (data) =>
          filtered_rows.filter(
            (row) => row.sales_order.order_id === data.order_id
          ).length > 0
      );
    }

    if (status.length > 0) {
      const filtered_rows = fulfillments.filter((fulfillment) =>
        status.includes(fulfillment.fulfillment_status)
      );

      initial_data = tableData.filter(
        (data) =>
          filtered_rows.filter(
            (row) => row.sales_order.order_id === data.order_id
          ).length > 0
      );
    }

    if (needsReview.length > 0) {
      const filtered_rows = fulfillments.filter((fulfillment) =>
        needsReview.includes(fulfillment.fulfillment_needs_review)
      );

      initial_data = tableData.filter(
        (data) =>
          filtered_rows.filter(
            (row) => row.sales_order.order_id === data.order_id
          ).length > 0
      );
    }

    if (deliveryZone && deliveryZone !== "- Select One -") {
      const filtered_rows = fulfillments.filter(
        (fulfillment) =>
          deliveryZone === fulfillment.delivery_attributes.delivery_zone
      );

      initial_data = tableData.filter(
        (data) =>
          filtered_rows.filter(
            (row) => row.sales_order.order_id === data.order_id
          ).length > 0
      );
    }

    if (shippingMethod && shippingMethod !== "- Select One -") {
      const filtered_rows = fulfillments.filter(
        (fulfillment) =>
          shippingMethod === fulfillment.delivery_attributes.shipping_method
      );

      initial_data = tableData.filter(
        (data) =>
          filtered_rows.filter(
            (row) => row.sales_order.order_id === data.order_id
          ).length > 0
      );
    }

    if (orderDate) {
      const filtered_rows = fulfillments.filter((fulfillment) =>
        dateRangeChecker(orderDate, fulfillment.sales_order.created)
      );

      initial_data = tableData.filter(
        (data) =>
          filtered_rows.filter(
            (row) => row.sales_order.order_id === data.order_id
          ).length > 0
      );
    }

    if (shipDate) {
      const filtered_rows = fulfillments.filter((fulfillment) =>
        dateRangeChecker(shipDate, fulfillment.ship_date)
      );

      initial_data = tableData.filter(
        (data) =>
          filtered_rows.filter(
            (row) => row.sales_order.order_id === data.order_id
          ).length > 0
      );
    }

    if (deliveryDate) {
      const filtered_rows = fulfillments.filter((fulfillment) =>
        dateRangeChecker(deliveryDate, fulfillment.delivery_date)
      );

      initial_data = tableData.filter(
        (data) =>
          filtered_rows.filter(
            (row) => row.sales_order.order_id === data.order_id
          ).length > 0
      );
    }

    if (sortValue) {
      switch (sortValue) {
        case "today":
          const filter_month = new Date().getMonth();
          const filter_date = new Date().getDate();
          const filter_day = new Date().getDay();

          const filtered_rows = fulfillments.filter(
            (fulfillment) =>
              filter_month ===
                fulfillment.sales_order.created.toDate().getMonth() &&
              filter_date ===
                fulfillment.sales_order.created.toDate().getDate() &&
              filter_day === fulfillment.sales_order.created.toDate().getDay()
          );

          initial_data = tableData.filter(
            (data) =>
              filtered_rows.filter(
                (row) => row.sales_order.order_id === data.order_id
              ).length > 0
          );
          break;
        case "yesterday":
          let date = new Date();
          date.setDate(date.getDate() - 1);
          const filter_month_yesterday = date.getMonth();
          const filter_date_yesterday = date.getDate();
          const filter_day_yesterday = date.getDay();

          const filtered_rows_by_yesterday = fulfillments.filter(
            (fulfillment) =>
              filter_month_yesterday ===
                fulfillment.sales_order.created.toDate().getMonth() &&
              filter_date_yesterday ===
                fulfillment.sales_order.created.toDate().getDate() &&
              filter_day_yesterday ===
                fulfillment.sales_order.created.toDate().getDay()
          );

          initial_data = tableData.filter(
            (data) =>
              filtered_rows_by_yesterday.filter(
                (row) => row.sales_order.order_id === data.order_id
              ).length > 0
          );
          break;
        case "lastWeek":
          var today = new Date();

          const rows = fulfillments.filter(
            (fulfillment) =>
              Math.ceil(
                (today - fulfillment.sales_order.created.toDate()) /
                  (1000 * 60 * 60 * 24)
              ) <= 7
          );

          initial_data = tableData.filter(
            (data) =>
              rows.filter((row) => row.sales_order.order_id === data.order_id)
                .length > 0
          );
          break;
        default:
          break;
      }
    }

    const pageData = initial_data.filter(
      (row, index) =>
        index >= (currentPage - 1) * perPage && index < currentPage * perPage
    );

    setTotal(initial_data.length);
    setTableRows(pageData);
    setCsvData(initial_data);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    tableData,
    fulfillments, // eslint-disable-next-line react-hooks/exhaustive-deps
    queryValue == null,
    status,
    needsReview,
    deliveryZone,
    shippingMethod,
    deliveryDate,
    orderDate,
    shipDate,
    sortValue,
    perPage,
  ]);

  const resourceName = {
    singular: "fulfillments",
    plural: "fulfillments",
  };
  const resourceIDResolver = (tableRows) => {
    return tableRows.id;
  };

  const gotoBulkEditor = () => {
    dispatch({
      type: "switch_view",
      payload: { mode: "bulk_editor", ids: selectedResources },
    });
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(tableRows, {
      resourceIDResolver,
    });
  useEffect(() => {
    changeText("More actions", "Change needs_review");
  }, [selectedResources]);

  const handleStatusChange = useCallback((value) => {
    handleClearAll();
    setStatus(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleNeedsReviewChange = useCallback((value) => {
    handleClearAll();
    setNeedsReview(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handledDliveryZoneChange = useCallback((value) => {
    handleClearAll();
    setDeliveryZone(value); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShippingMethodChange = useCallback((value) => {
    handleClearAll();
    setShippingMethod(value); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = (id, key, pref) => {
    console.log(id, key, pref);
    setLoading(true);
    dispatch(updateSignleField(id, key, value, pref))
      .then((res) => {
        dispatch(toggleToast());
      })
      .catch((err) => dispatch(toggleToast("Error Occurred!")));
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleOrderMonthChange = useCallback(
    (order_month, order_year) => setOrderCalendar({ order_month, order_year }), // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleShipMonthChange = useCallback(
    (ship_month, ship_year) => setShipCalendar({ ship_month, ship_year }),
    []
  );

  const handleDeliveryMonthChange = useCallback(
    (delivery_month, delivery_year) =>
      setDeliveryCalendar({ delivery_month, delivery_year }),
    []
  );

  const handleBulkShipMonthChange = useCallback(
    (bulk_ship_month, bulk_ship_year) =>
      setBulkShipCalendar({ bulk_ship_month, bulk_ship_year }),
    []
  );

  const handleOrderDateChange = useCallback((value) => {
    handleClearAll();
    setOrderDate(value); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShipDateChange = useCallback((value) => {
    handleClearAll();
    setShipDate(value); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeliveryDateChange = useCallback((value) => {
    handleClearAll();
    setDeliveryDate(value); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBulkShipDateChange = useCallback((value) => {
    handleClearAll();
    setBulkShipDate(value); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleStatusRemove = useCallback(() => setStatus([]), []);
  const handleNeedsReviewRemove = useCallback(() => setNeedsReview([]), []);
  const handleDeliveryZoneRemove = useCallback(() => setDeliveryZone(""), []);
  const handleShippingMethodRemove = useCallback(
    () => setShippingMethod(""),
    []
  );
  const handleOrderDateRemove = useCallback(() => setOrderDate(null), []);
  const handleShipDateRemove = useCallback(() => setShipDate(null), []);
  const handleDeliveryDateRemove = useCallback(() => setDeliveryDate(null), []);
  const handleSortRemove = useCallback(() => setSortValue(""), []);

  const handleClearAll = useCallback(() => {
    handleQueryValueRemove();
    handleStatusRemove();
    handleNeedsReviewRemove();
    handleDeliveryZoneRemove();
    handleShippingMethodRemove();
    handleOrderDateRemove();
    handleShipDateRemove();
    handleDeliveryDateRemove();
    handleSortRemove();
  }, [
    handleQueryValueRemove,
    handleStatusRemove,
    handleNeedsReviewRemove,
    handleDeliveryZoneRemove,
    handleShippingMethodRemove,
    handleOrderDateRemove,
    handleShipDateRemove,
    handleDeliveryDateRemove,
    handleSortRemove,
  ]);

  const handleSortChange = useCallback((value) => {
    handleClearAll();
    setSortValue(value); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleQueryChange = useCallback((value) => {
    handleClearAll();
    setQueryValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBulkChangeModal = useCallback(() => {
    setActive(true);
  }, []);

  const handleBulkChangeShipDate = useCallback(() => {
    setActive(false);

    dispatch(
      updateFields(
        selectedResources,
        { ship_date: bulkShipDate.start },
        "ship_date"
      )
    ).then((res) => {
      dispatch(toggleToast());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResources, bulkShipDate]);

  const handleToTrue = useCallback(() => {
    dispatch(
      updateFields(
        selectedResources,
        { fulfillment_needs_review: true },
        "review"
      )
    ).then((res) => {
      dispatch(toggleToast());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToFalse = useCallback(() => {
    dispatch(
      updateFields(
        selectedResources,
        { fulfillment_needs_review: false },
        "review"
      )
    ).then((res) => {
      dispatch(toggleToast());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const promotedBulkActions = [
    {
      content: "Change Ship Date",
      onAction: handleBulkChangeModal,
    },
  ];
  const bulkActions = [
    {
      content: "Bulk Change to True ",
      onAction: handleToTrue,
    },
    {
      content: "Bulk Change to False",
      onAction: handleToFalse,
    },
  ];

  const filters = [
    {
      key: "fulfillment_status",
      label: "Fulfillment Status",
      filter: (
        <ChoiceList
          title="Fulfillment Status"
          titleHidden
          choices={[
            { label: "Assigned", value: "assigned" },
            { label: "Pending", value: "pending" },
            { label: "Completed", value: "completed" },
            { label: "Canceled", value: "canceled" },
          ]}
          selected={status || []}
          onChange={handleStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "fulfillment_needs_review",
      label: "Fulfillment Needs Review",
      filter: (
        <ChoiceList
          title="Fulfillment Needs Review"
          titleHidden
          choices={[
            { label: "True", value: true },
            { label: "False", value: false },
          ]}
          selected={needsReview || []}
          onChange={handleNeedsReviewChange}
          allowMultiple
        />
      ),
    },
    {
      key: "delivery_attributes",
      label: "Delivery Attributes",
      filter: (
        <>
          <Select
            label="Delivery Zone"
            options={deliveryZoneOptions}
            onChange={handledDliveryZoneChange}
            value={deliveryZone}
          />
          <br />
          <Select
            label="Shipping Method"
            options={shippingMethodOptions}
            onChange={handleShippingMethodChange}
            value={shippingMethod}
          />
        </>
      ),
    },
    {
      key: "filter_by_date",
      label: "Filter By Date",
      filter: (
        <>
          <br />
          <Subheading>Order Date</Subheading>
          <br />
          <DatePicker
            month={order_month}
            year={order_year}
            onChange={handleOrderDateChange}
            onMonthChange={handleOrderMonthChange}
            selected={orderDate}
            allowRange
          />
          <br />
          <Subheading>Ship Date</Subheading>
          <br />
          <DatePicker
            month={ship_month}
            year={ship_year}
            onChange={handleShipDateChange}
            onMonthChange={handleShipMonthChange}
            selected={shipDate}
            allowRange
          />
          <br />
          <Subheading>Delivery Date</Subheading>
          <br />

          <DatePicker
            month={delivery_month}
            year={delivery_year}
            onChange={handleDeliveryDateChange}
            onMonthChange={handleDeliveryMonthChange}
            selected={deliveryDate}
            allowRange
          />
        </>
      ),
    },
  ];

  const appliedFilters = !isEmpty(taggedWith)
    ? [
        {
          key: "taggedWith",
          label: disambiguateLabel("taggedWith", taggedWith),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : [];

  const sortOptions = [
    { label: "OrderDate", value: "" },
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 days", value: "lastWeek" },
  ];

  const rowMarkup =
    tableRows &&
    tableRows.map((row, index) => (
      <IndexTable.Row
        id={row["id"]}
        key={row["id"]}
        selected={selectedResources.includes(row["id"])}
        position={index}
      >
        <IndexTable.Cell>
          <TextStyle variation="strong">{row["order_id"]}</TextStyle>
        </IndexTable.Cell>
        {keys.map(
          (key, index) =>
            index !== 0 && (
              <IndexTable.Cell key={index}>
                {editable_columns.includes(key) ? (
                  <ReactHover options={optionsCursorTrueWithMargin}>
                    <Trigger type="trigger">
                      <span>{row[key]}</span>
                    </Trigger>
                    <Hover type="hover">
                      <div className="hover-box" onClick={handleClick}>
                        <TextField
                          label={`Edit ${tableHeader[index].title}`}
                          value={value}
                          onChange={handleChange}
                          autoComplete="off"
                          connectedRight={
                            <Button
                              primary
                              loading={loading}
                              onClick={() =>
                                handleSave(row["id"], key, prefix[key])
                              }
                            >
                              Save
                            </Button>
                          }
                        />
                      </div>
                    </Hover>
                  </ReactHover>
                ) : (
                  row[key]
                )}
              </IndexTable.Cell>
            )
        )}
      </IndexTable.Row>
    ));

  return (
    <Card
      style={{ marginBottom: "20px" }}
      title={tableTitle}
      actions={[
        {
          content: "Bulk Editor",
          onAction: gotoBulkEditor,
        },
        {
          content: (
            <CsvDownloader
              filename="csv-fulfillmentsData"
              datas={
                selectedResources
                  ? csvData.filter((data) =>
                      selectedResources.includes(data.id)
                    )
                  : csvData
              }
            >
              Export CSV
            </CsvDownloader>
          ),
        },
      ]}
    >
      <Modal
        instant
        open={active}
        onClose={() => setActive(false)}
        title="Bulk Change Ship date"
        primaryAction={{
          content: "Save",
          onAction: handleBulkChangeShipDate,
        }}
      >
        <Modal.Section>
          <br />
          <DatePicker
            month={bulk_ship_month}
            year={bulk_ship_year}
            onChange={handleBulkShipDateChange}
            onMonthChange={handleBulkShipMonthChange}
            selected={bulkShipDate}
          />
        </Modal.Section>
      </Modal>
      <div style={{ padding: "16px", display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={handleQueryChange}
            onQueryClear={handleQueryValueRemove}
            onClearAll={handleClearAll}
          />
        </div>
        <div style={{ paddingLeft: "0.4rem" }}>
          <Select
            labelInline
            label="Sort by"
            options={sortOptions}
            value={sortValue}
            onChange={handleSortChange}
          />
        </div>
      </div>
      <IndexTable
        resourceName={resourceName}
        itemCount={tableRows.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        promotedBulkActions={promotedBulkActions}
        bulkActions={bulkActions}
        headings={tableHeader}
        lastColumnSticky
      >
        {rowMarkup}
      </IndexTable>

      <FooterHelp>
        <Pagination
          label={`${(currentPage - 1) * perPage}-${
            total > currentPage * perPage - 1
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
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case "taggedWith":
        return `Delivery Zone: ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
}
