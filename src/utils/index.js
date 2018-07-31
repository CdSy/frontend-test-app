import moment from 'moment';

export function getDataType(data) {
    let type = typeof data;
    const isStringNumber = !isNaN(data);

    if (type === 'string' && isStringNumber) {
        if (isInt(data)) {
            return 'number';
        } else {
            return 'float';
        }
    }

    if (type === 'string') {
        const isDate = moment(data, moment.ISO_8601, true).isValid();

        if (isDate) {
            return 'date';
        }
    }

    if (type === 'string' && isURL(data)) {
        return 'link';
    }

    if (type === 'number' && !isInt(data)) {
        return 'float';
    }

    return type;
}

export function isURL(str) {
    const pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    return pattern.test(str);
}

export function isInt(number) {
    return Number.isInteger(number);
}

export const compose = (...fns) =>
    fns.reduceRight((prevFn, nextFn) =>
        (...args) => nextFn(prevFn(...args)),
        value => value
    );

export const sorting = {
    date: function(data, colName, order) {
        const sortedData = data.sort((a,b) => {
            if (order === 'desc') {
                return moment.utc(a[colName]).diff(moment.utc(b[colName]));
            } else {
                return moment.utc(b[colName]).diff(moment.utc(a[colName]));
            }
        });

        return sortedData;
    },
    string: function(data, colName, order) {
        const sortedData = data.sort((a,b) => {
            if (order === 'desc') {
                return a[colName].localeCompare(b[colName]);
            } else {
                return b[colName].localeCompare(a[colName]);
            }
        });

        return sortedData;
    },
    number: function(data, colName, order) {
        const sortedData = data.sort((a,b) => {
            if (order === 'desc') {
                return a[colName] - b[colName];
            } else {
                return b[colName] - a[colName];
            }
        });

        return sortedData;
    },
    float: function(data, colName, order) {
        return this.number(data, colName, order);
    },
    link: function(data, colName, order) {
        return this.string(data, colName, order);
    }
};