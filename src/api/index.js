import { db } from './db';

export function getAvailableTables() {
    const tables = Object.keys(db);

    return Promise.resolve(tables);
}

export function getTable(name) {
    const table = db[name] ? db[name] : undefined;

    if (table) {
        return Promise.resolve(table);
    } else {
        return Promise.reject(new Error('page not found'));
    }
}