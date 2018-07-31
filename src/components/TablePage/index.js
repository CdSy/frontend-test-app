import React, { Component, Fragment } from "react";
import { withRouter } from 'react-router-dom';
import humanizeString from'humanize-string';
import { getTable } from '../../api';
import TableComponent from './table';
import './style.less';

@withRouter
class TablePage extends Component {
    state = {
        data: [],
        tableName: '',
        filterByString: null,
        filterByKey: null,
        colName: null,
        type: null,
        order: null,
    }

    componentDidMount() {
        const { history, match } = this.props;
        const tableName = match.params.tableName;

        getTable(tableName)
            .then((table) => {
                this.setState({data: table, tableName});
                document.title = humanizeString(this.state.tableName);
            })
            .catch((e) => history.push('/404-page'));
    }

    componentDidUpdate(prevProps, prevState) {
        const prevTableName = prevProps.match.params.tableName;
        const currentTableName = this.props.match.params.tableName;

        if (prevTableName !== currentTableName) {
            getTable(currentTableName)
                .then((table) => {
                    this.setState({
                        data: table, 
                        tableName: currentTableName,
                        filterByString: null,
                        filterByKey: null,
                        colName: null,
                        type: null,
                        order: null
                    });
                    document.title = humanizeString(this.state.tableName);
                });
        }
    }

    onSortChange = (colName, type, order) => {
        this.setState({
            colName,
            type,
            order
        });
    }

    onFilterChange = (value, colName, type) => {
        this.setState({
            filterByString: value,
            filterByKey: colName,
            type: type
        });
    }

    render() {
        const { data, tableName,filterByString, filterByKey, colName, type, order } = this.state;

        return (
            <Fragment>
                <h2 className="text-center">
                    {humanizeString(tableName)}
                </h2>
                <TableComponent 
                    data={data}
                    onSortChange={this.onSortChange}
                    onFilterChange={this.onFilterChange}
                    filterByString={filterByString}
                    filterByKey={filterByKey}
                    colName={colName}
                    type={type}
                    order={order}
                />
            </Fragment>
        );
    }
}

export default TablePage;