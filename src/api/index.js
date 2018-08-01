import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;

export function getAvailableTables() {
    return axios.get(`${API_URL}/api/tables`).then((response) => response.data);
}

export function getTable(tableName) {
    return axios.get(`${API_URL}/api/table/${tableName}`).then((response) => response.data);
}