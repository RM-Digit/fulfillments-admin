import createApp from "@shopify/app-bridge";
import { Redirect } from "@shopify/app-bridge/actions";

import "@shopify/polaris/dist/styles.css";
import "../styles/components.css";

const apiKey = "SHOPIFY_API_KEY";
const redirectUri =
  "https://us-central1-fulfillments-admin.cloudfunctions.net/oauthCallback";
const urlParams = new URLSearchParams(window.location.search);
const shop_origin = urlParams.get("shop");
const permissionUrl = `https://${shop_origin}/admin/oauth/authorize?client_id=${apiKey}&scope=read_products,read_content&redirect_uri=${redirectUri}`;
const token = urlParams.get("access_token");
const shopHost = shop_origin + "/admin";
const host = Buffer.from(shopHost).toString("base64");

localStorage.setItem("STOREID", urlParams.get("id"))
const MyApp = ({ Component }) => {
  if (token) {
    return <Component />;
  } else {
    // eslint-disable-next-line eqeqeq
    if (window.top == window.self) {
      window.location.assign(permissionUrl);

      // If the current window is the 'child', change the parent's URL with Shopify App Bridge's Redirect action
    } else {
      const app = createApp({
        apiKey: apiKey,
        host: host,
        forceRedirect: true,
      });

      Redirect.create(app).dispatch(Redirect.Action.REMOTE, permissionUrl);
    }
    return null;
  }
};

export default MyApp;
