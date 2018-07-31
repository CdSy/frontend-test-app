import axios from 'axios';

const SERVER = 'http://localhost:5000';

export function getAvailableTables() {
    return axios.get(`${SERVER}/api/tables`).then((response) => response.data);
}

export function getTable(tableName) {
    return axios.get(`${SERVER}/api/table/${tableName}`).then((response) => response.data);
}