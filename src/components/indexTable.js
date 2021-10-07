import React, { useCallback, useState, useEffect } from "react";
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
  Heading,
  Pagination,
  FooterHelp,
} from "@shopify/polaris";

export default function IndexTableWithAllElementsExample({
  tableData,
  perPage,
}) {
  const [taggedWith, setTaggedWith] = useState("");
  const [queryValue, setQueryValue] = useState(null);
  const [sortValue, setSortValue] = useState("today");
  const [availability, setAvailability] = useState(null);
  const [productType, setProductType] = useState(null);
  const [tableRows, setTableRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedDates, setSelectedDates] = useState({
    start: new Date("Fri Oct 01 2021 00:00:00 GMT-0500 (EST)"),
    end: new Date("Sun Oct 3 2021 00:00:00 GMT-0500 (EST)"),
  });
  const handleMonthChange = useCallback(
    (month, year) => setSelectedDates({ month, year }),
    []
  );
  useEffect(() => {
    const pageData = tableData.filter(
      (row, index) =>
        index >= (currentPage - 1) * perPage && index < currentPage * perPage
    );
    setTotal(tableData.length);
    setTableRows(pageData);
  }, [currentPage, tableData]);

  const tableHeader = [
    { title: "Order ID" },
    { title: "Date_Created" },
    { title: "Fulfillment ID" },
    { title: "Ship_date" },
    { title: "Delivery_date" },
    { title: "Contact Email" },
    { title: "Fulfillment Status" },
  ];

  const resourceName = {
    singular: "fulfillments",
    plural: "fulfillments",
  };
  const resourceIDResolver = (tableRows) => {
    return tableRows.order_id;
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(tableRows, {
      resourceIDResolver,
    });

  const handleAvailabilityChange = useCallback(
    (value) => setAvailability(value),
    []
  );
  const handleProductTypeChange = useCallback(
    (value) => setProductType(value),
    []
  );
  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    []
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);
  const handleSortChange = useCallback((value) => setSortValue(value), []);
  const promotedBulkActions = [
    {
      content: "Edit Fulfillment",
      onAction: () => console.log("Todo: implement bulk edit"),
    },
  ];
  const bulkActions = [
    {
      content: "Change ship_date",
      onAction: () => console.log("Todo: implement bulk change ship dates"),
    },
    {
      content: "Change fulfillment_needs_review",
      onAction: () =>
        console.log(
          "Todo: implement bulk change fulfillment_needs_review",
          selectedResources
        ),
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
          selected={availability || []}
          onChange={handleAvailabilityChange}
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
          title="Product type"
          titleHidden
          choices={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          selected={productType || []}
          onChange={handleProductTypeChange}
          allowMultiple
        />
      ),
    },
    {
      key: "delivery_attributes",
      label: "Delivery Attributes",
      filter: (
        <>
          <TextField
            label="Delivery Zone"
            value={taggedWith}
            onChange={handleTaggedWithChange}
            autoComplete="off"
            labelHidden
          />
          <ChoiceList
            title="Delivery"
            titleHidden
            choices={[
              { label: "Shipping Method", value: "shipping_method" },
              { label: "Delivery Date", value: "delivery_date" },
            ]}
            selected={productType || []}
            onChange={handleProductTypeChange}
            allowMultiple
          />
        </>
      ),
    },
    {
      key: "order_ship_date",
      label: "Order & Ship Date",
      filter: (
        <>
          <Heading>Order Date</Heading>
          <DatePicker
            month={10}
            year={2021}
            onChange={setSelectedDates}
            onMonthChange={handleMonthChange}
            selected={selectedDates}
          />
          <Heading>Ship Date</Heading>
          <DatePicker
            month={10}
            year={2021}
            onChange={setSelectedDates}
            onMonthChange={handleMonthChange}
            selected={selectedDates}
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
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 days", value: "lastWeek" },
  ];

  const rowMarkup = tableRows.map(
    (
      {
        order_id,
        data_created,
        fulfillment_id,
        ship_date,
        delivery_date,
        contact_email,
        fulfillment_status,
      },
      index
    ) => (
      <IndexTable.Row
        id={order_id}
        key={order_id}
        selected={selectedResources.includes(order_id)}
        position={index}
      >
        <IndexTable.Cell>
          <TextStyle variation="strong">{order_id}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{data_created}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillment_id}</IndexTable.Cell>
        <IndexTable.Cell>{ship_date}</IndexTable.Cell>
        <IndexTable.Cell>{delivery_date}</IndexTable.Cell>
        <IndexTable.Cell>{contact_email}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillment_status}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Card style={{ marginBottom: "20px" }}>
      <div style={{ padding: "16px", display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={setQueryValue}
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
