const config = {
  apiKey: "AIzaSyB8aSH-kgheoCz71Rusg2hkGjVJ8jjbDWs",
  authDomain: "fulfillments-admin.firebaseapp.com",
  databaseURL: "https://fulfillments-admin-default-rtdb.firebaseio.com",
  projectId: "fulfillments-admin",
  storageBucket: "fulfillments-admin.appspot.com",
  messagingSenderId: "660625369628",
  appId: "1:660625369628:web:189a4babd2530dd15d0dd9",
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}
