const functions = require("firebase-functions");
const axios = require("axios");
const admin = require("firebase-admin");
const { validateHMAC } = require("./utils");
const SHOPIFY_CLIENT_SECRET = "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";
const SHOPIFY_CLIENT_ID = "fd6c2acf54456d5dc618ba20f928fca3";

const app = admin.initializeApp({
  projectId: "fulfillments-admin",
});

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase!");
});

exports.erase = functions.https.onRequest((req, res) => {
  // GDPR mandatory webhooks
  res.send("Thank you");
});

exports.requestData = functions.https.onRequest((req, res) => {
  // GDPR mandatory webhooks
  res.send("Request recieved");
});

exports.oauthCallback = functions.https.onRequest((req, res) => {
  console.log("wow request received");
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "*");

  const shop = req.query.shop;
  const code = req.query.code;
  const hmac = req.query.hmac;

  console.log("!!!", shop, code, hmac);
  if (!(shop && hmac && code))
    return res.redirect(
      `https://${shop}/admin/apps/${SHOPIFY_CLIENT_ID}/error.html`
    );

  const hashEquals = validateHMAC({
    reqQuery: req.query,
    hmac,
    apiSecret: SHOPIFY_CLIENT_SECRET,
  });
  console.log("has equals", hashEquals);
  if (!hashEquals)
    return res.redirect(
      `https://${shop}/admin/apps/${SHOPIFY_CLIENT_ID}/error.html?message=HMAC validation failed`
    );

  return axios
    .post(`https://${shop}/admin/oauth/access_token`, {
      code: code,
      client_id: SHOPIFY_CLIENT_ID,
      client_secret: SHOPIFY_CLIENT_SECRET,
    })
    .then((body) => {
      const accessToken = body.data.access_token;
      console.log("accessTOken", accessToken);
      if (!accessToken)
        return res.redirect(
          `https://${shop}/admin/apps/${SHOPIFY_CLIENT_ID}/error.html`
        );
      return res.redirect(
        `https://${shop}/admin/apps/${SHOPIFY_CLIENT_ID}` +
          `/index.html?access_token=${accessToken}&shop=${shop}`
      );
    })
    .catch((err) => {
      console.log("err", err);
      return res.redirect(
        `https://${shop}/admin/apps/${SHOPIFY_CLIENT_ID}/error.html`
      );
    });
});
