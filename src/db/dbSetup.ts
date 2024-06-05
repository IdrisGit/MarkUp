import { createRxDatabase, RxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { NoteSchema, TagSchema } from '@db/schema';

// TODO: Add proper type system for database, tried following docs but it doesn't work as of now, might need to dig in a little.

// ? StrictMode runs this twice creating multiple instances of database
// ? check if promise for creating db instance already exist
let dbPromise: Promise<RxDatabase> | null = null;

export const createDatabase = async (): Promise<RxDatabase> => {
  if (!dbPromise) {
    dbPromise = (async () => {
      const db = await createRxDatabase({
        name: 'notesdb',
        storage: getRxStorageDexie(),
      });

      await db.addCollections({
        notes: {
          schema: NoteSchema,
        },
        tags: {
          schema: TagSchema,
        },
      });
      return db;
    })();
  }
  return dbPromise;
};
