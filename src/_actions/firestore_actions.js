import { FETCH_ALL, UPDATE_DOC, UPDATE_BULK, BULK_EDITOR } from "./type";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import {collection_name} from "../constants"

export async function fetchAll() {
  let rowData = [];

  const querySnapshot = await getDocs(collection(db, collection_name));
  querySnapshot.forEach((doc) => {
    const id = { id: doc.id };
    const tableData = { ...id, ...doc.data() };

    rowData.push(tableData);
  });

  return { type: FETCH_ALL, payload: rowData };
}

export async function updateSignleField(id, key, val, pref) {
  const docRef = doc(db, collection_name, id);
  const docSnap = await getDoc(docRef);

  if (pref) {
    const old = docSnap.data()[pref];
    await updateDoc(docRef, { [pref]: { ...old, [key]: val } });
  } else {
    await updateDoc(docRef, {
      [key]: val,
    });
  }
  const updated_data = pref ? { [pref]: { [key]: val } } : { [key]: val };

  var allData = [];

  const querySnapshot = await getDocs(collection(db, collection_name));
  querySnapshot.forEach((doc) => {
    const id = { id: doc.id };
    const tableData = { ...id, ...doc.data() };
    allData.push(tableData);
  });
  return {
    type: UPDATE_DOC,
    payload: { updated_data: updated_data, tableData: allData },
  };
}

export async function updateFields(ids, data, type) {
  console.log(data);
  ids.forEach(async (id) => {
    const docRef = doc(db, collection_name, id);
    await updateDoc(docRef, data);
  });

  var allData = [];

  const querySnapshot = await getDocs(collection(db, collection_name));
  querySnapshot.forEach((doc) => {
    const id = { id: doc.id };
    const tableData = { ...id, ...doc.data() };
    allData.push(tableData);
  });

  return {
    type: UPDATE_BULK,
    payload: { updated_data: ids, tableData: allData },
  };
}

export async function bulkUpdateFields(datas, prefix) {
  console.log("datas", datas);

  for (const id in datas) {
    const docRef = doc(db, collection_name, id);

    for (const key in datas[id]) {
      const val = datas[id][key];
      const pref = prefix[key];
      console.log("pref", pref);
      if (pref) {
        const docSnap = await getDoc(docRef);
        const old = docSnap.data()[pref];
        await updateDoc(docRef, { [pref]: { ...old, [key]: val } });
      } else {
        await updateDoc(docRef, {
          [key]: val,
        });
      }
    }
  }

  var allData = [];

  const querySnapshot = await getDocs(collection(db, collection_name));
  querySnapshot.forEach((doc) => {
    const id = { id: doc.id };
    const tableData = { ...id, ...doc.data() };
    allData.push(tableData);
  });
  return {
    type: BULK_EDITOR,
    payload: { tableData: allData },
  };
}
