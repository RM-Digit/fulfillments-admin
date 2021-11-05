export const editable_columns = [
  "shipping_method",
  "delivery_zone",
  "service_time",
  "business_indicator",
  "delivery_hours",
  "contact_email",
  "special_requests",
  "notes",
  "contact_phone",
];

export const validationFields = [
  "shipping_method",
  "delivery_zone",
  "contact_email",
];

export const delivery_zone = [
  {value: 'Chicago HD', label: 'Chicago HD'},
  {value: 'Minneapolis HD', label: 'Minneapolis HD'},
  {value: 'Madison HD', label: 'Madison HD'},
  {value: 'Galesburg HD', label: 'Galesburg HD'},
  {value: 'Galesburg 1 Day', label: 'Galesburg 1 Day'},
  {value: 'Galesburg 2 Day', label: 'Galesburg 2 Day'},
  {value: 'Galesburg 2 Day Air', label: 'Galesburg 2 Day Air'},
  {value: 'Lenexa 1 Day', label: 'Lenexa 1 Day'},
  {value: 'Lenexa 2 Day', label: 'Lenexa 2 Day'},
  {value: 'SLC 2 Day', label: 'SLC 2 Day'},
  {value: 'SLC 3 Day', label: 'SLC 3 Day'},
  {value: 'Toledo 2 Day', label: 'Toledo 2 Day'},
];

export const shipping_method = [
  {value: 'Ground Home Delivery', label: 'Ground Home Delivery'},
  {value: 'Home Delivery Program', label: 'Home Delivery Program'},
  {value: 'Two Day', label: 'Two Day'},
  {value: 'Priority Overnight', label: 'Priority Overnight'},
];

export const collection_name = "delivery_attributes_2";

export const redirectUri = "https://us-central1-fulfillments-admin.cloudfunctions.net/oauthCallback";

export const apiKey = "fd6c2acf54456d5dc618ba20f928fca3";

export const default_columns = ["shipping_method", "service_time", "contact_email"]; //bulk editor default columns