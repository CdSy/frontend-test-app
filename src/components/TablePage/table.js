import React, { Component } from "react";
import { Table, ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';
import TableHead from './tableHead';
import {getDataType, compose, sorting} from '../../utils';

class TableComponent extends Component {
    static defaultProps = {
        data: []
    }

    onSortChange = (colName, type, order) => {
        this.props.onSortChange(colName, type, order);
    }

    onFilterChange = (value, colName, type) => {
        this.props.onFilterChange(value, colName, type);
    }

    sortData = (data) => {
        const { colName, type, order } = this.props;

        if (!colName || data.length < 2) {
            return data;
        }

        const sortedData = sorting[type](data, colName, order);

        return sortedData;
    }

    filterData = (data, filter) => {
        if (data.length === 0 || !filter || !filter.value.length) {
            return data;
        }
        
        const {colName, type, value} = filter;

        if (type === 'number' || type === 'float') {
            return data.filter(object => {
                const a = ~~parseFloat(object[colName]);
                const b = ~~parseFloat(value);

                return a === b;
            });
        }

        if (type === 'date') {
            return data.filter(object => moment(object[colName]).isSame(value, 'day'));
        }

        return data.filter(object => String(object[colName]).includes(value));
    }

    generateFilterFunctions = () => {
        const {filterByKeys} = this.props;
        const filters = Object.keys(filterByKeys).map(key => filterByKeys[key]);

        if (!filters) {
            return [(data) => (data)];
        }

        return filters.map((filter) => (data) => this.filterData(data, filter));
    }

    renderHead(data) {
        const columns = Object.keys(data);

        return (
            <thead>
                <tr>
                    {columns.map((col, index) => {
                        const type = getDataType(data[col]);
                        const sortable = type === 'object' || type === 'image' ? false : true;

                        return (
                            <TableHead 
                                key={index} 
                                colName={col}
                                type={type}
                                onSortChange={this.onSortChange}
                                onFilterChange={this.onFilterChange}
                                sortable={sortable}
                            />
                        );
                    })}
                </tr>
            </thead>
        );
    }

    renderCell(data, type, index) {
        switch(type) {
            case 'string':
                return <td key={index}>{data}</td>;

            case 'image':
                return (
                    <td key={index} className="text-center">
                        <img src={data} alt={type} className="image"/>
                    </td>
                );

            case 'link':
                return (
                    <td key={index}>
                        <a href={data} target="_blank">
                            {data}
                        </a>
                    </td>
                );

            case 'date':
                return <td key={index}>{moment(data, moment.ISO_8601).fromNow()}</td>;

            case 'number':
                return <td key={index} className="text-right">{data}</td>;

            case 'float':
                const fixedNumber = Math.floor(parseFloat(data) * 100) / 100;

                return (
                    <td key={index} className="text-right">
                        {`$ ${fixedNumber}`}
                    </td>
                );

            case 'object':
                return (
                    <td key={index}>
                        <ul className="top-down-list">
                            
                        </ul>
                        <ListGroup>
                            {Object.keys(data)
                                   .map((prop, index) => (
                                        <ListGroupItem header={prop} key={index}>
                                           {data[prop]}
                                        </ListGroupItem>
                                   ))
                            }
                        </ListGroup>
                    </td>
                );

            default:
                return <td key={index}></td>
        } 
    }

    renderRows(data) {
        if (data.length === 0) {
            return null;
        }

        return (
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={row.id}>
                        {Object.keys(row).map((col, colIndex) => {
                            const dataType = getDataType(row[col]);

                            return this.renderCell(row[col], dataType, colIndex);
                        })}
                    </tr>
                ))}
            </tbody>
        );
    }

    render() {
        const { data } = this.props;
        const headTitles = data.length ? data[0] : [];
        const filterFunctions = this.generateFilterFunctions();
        const filteredData = compose(...filterFunctions, this.sortData)(data);


        return (
            <Table striped bordered condensed hover>
                { this.renderHead(headTitles) }
                { this.renderRows(filteredData) }
            </Table>
        );
    }
}

export default TableComponent;