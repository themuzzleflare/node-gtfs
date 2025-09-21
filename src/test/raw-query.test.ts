import { describe, it, beforeAll, afterAll, expect } from './test-utils.ts';
import config from './test-config.ts';
import { openDb, closeDb, importGtfs } from '../../dist/index.js';

beforeAll(async () => {
  openDb();
  await importGtfs(config);
});

afterAll(() => {
  const db = openDb();
  closeDb(db);
});

describe('Raw Query:', () => {
  it('should DELETE a trip', () => {
    const db = openDb();

    // noinspection SqlNoDataSourceInspection
    const results = db.prepare('SELECT COUNT(*) FROM trips').get() as {
      'COUNT(*)': number;
    };

    expect(results['COUNT(*)']).toEqual(218);

    // noinspection SqlNoDataSourceInspection
    db.exec("DELETE FROM trips where trip_id = '329';");

    // noinspection SqlNoDataSourceInspection
    const newResults = db.prepare('SELECT COUNT(*) FROM trips').get() as {
      'COUNT(*)': number;
    };

    expect(newResults['COUNT(*)']).toEqual(217);
  });
});
