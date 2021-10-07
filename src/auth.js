import createApp from "@shopify/app-bridge";
import { Redirect } from "@shopify/app-bridge/actions";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Cookies from "js-cookie";
import { AppProvider } from "@shopify/polaris";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/dist/styles.css";
import "./componentStyle.css";
const apiKey = "fd6c2acf54456d5dc618ba20f928fca3";
const redirectUri =
  "https://us-central1-fulfillments-admin.cloudfunctions.net/oauthCallback";
const urlParams = new URLSearchParams(window.location.search);
const shop_origin = urlParams.get("shop");
const permissionUrl = `https://${shop_origin}/admin/oauth/authorize?client_id=${apiKey}&scope=read_products,read_content&redirect_uri=${redirectUri}`;
const token = urlParams.get("access_token");
const shopHost = shop_origin + "/admin";
console.log("token", urlParams.get("access_token"));
console.log("shop_origin", shop_origin);
const host = Buffer.from(shopHost).toString("base64");
console.log("Host", host);
const MyApp = ({ Component }) => {
  console.log("top assign", window.top, window.self);
  if (token) {
    return (
      <AppProvider i18n={translations}>
        <Component />
      </AppProvider>
    );
  } else {
    if (window.top == window.self) {
      window.location.assign(permissionUrl);

      // If the current window is the 'child', change the parent's URL with Shopify App Bridge's Redirect action
    } else {
      const app = createApp({
        apiKey: apiKey,
        host: host,
      });

      Redirect.create(app).dispatch(Redirect.Action.REMOTE, permissionUrl);
      return null;
    }
  }
};

export default MyApp;
