import Dexie from "dexie";

export const db = new Dexie('Developer profiles');

db.version(1).stores({
    developer: '++id, name, experience, education'
})