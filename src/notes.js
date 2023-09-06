import { getDB, insertDB, saveDB } from "./db.js";

export const newNote = async (note, tags) => {
  const data = {
    tags,
    content: note,
    id: Date.now(),
  };
  await insertDB(data);
  return data;
};

export const getAllNotes = async () => {
  const { notes } = await getDB();

  return notes;
};

export const findNotes = async (filter) => {
  console.log("filter:", filter);
  const notes = await getAllNotes();
  console.log("notes:", notes);
  return notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );
};

export const removeNote = async (id) => {
  const notes = await getAllNotes();
  const match = notes.find((note) => note.id === id);

  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNotes });
    return id;
  }
};

export const removeAllNotes = async () => {
  await saveDB({ notes: [] });
};
