import { useEffect, useState } from 'react';
import { createDatabase } from '@db/dbSetup';
import { RxDatabase } from 'rxdb';

export const useDatabase = () => {
  const [db, setDb] = useState<RxDatabase | null>(null);

  useEffect(() => {
    const initDb = async () => {
      const dbInstance = await createDatabase();
      setDb(dbInstance);
    };

    initDb();
  }, []);

  return db;
};
