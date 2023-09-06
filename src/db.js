import fs from "fs/promises";

const DB_PATH_OG = new URL("../db.json", import.meta.url).pathname;

const DB_PATH = decodeURIComponent(DB_PATH_OG).substring(1);

export const getDB = async () => {
  console.log("DB_PATH:", DB_PATH);
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};

export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
};
export const insertDB = async (note) => {
  const db = await getDB();
  db.notes.push(note);
  await saveDB(db);
  return note;
};
