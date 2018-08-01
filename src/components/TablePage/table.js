import React, { Component } from "react";
import { Table, ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';
import TableHead from './tableHead';
import {getDataType, compose, sorting, filtering} from '../../utils';

class TableComponent extends Component {
    state = {
        filterByKeys: {},
        colName: null,
        type: null,
        order: null,
    }

    static defaultProps = {
        data: [],
    }

    onSortChange = (colName, type, order) => {
        this.setState({
            colName,
            type,
            order
        });
    }

    onFilterChange = (value, colName, type) => {
        const newFilterKeys = {...this.state.filterByKeys, [colName]: {colName, type, value}};

        this.setState({
            filterByKeys: newFilterKeys
        });
    }

    sortData = (data) => {
        const { colName, type, order } = this.state;

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
        const filteredData = filtering[type](data, colName, value);

        return filteredData;
    }

    generateFilterFunctions = () => {
        const {filterByKeys} = this.state;
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

        const types = Object.keys(data[0]).map((col) => getDataType(data[0][col]));

        return (
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={row.id}>
                        {Object.keys(row).map((col, colIndex) => {
                            return this.renderCell(row[col], types[colIndex], colIndex);
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