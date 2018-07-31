import React, {Component} from 'react';
import humanizeString from'humanize-string';
import {FormControl} from 'react-bootstrap';

class TableHead extends Component {
    state = {
        order: 'asc'
    }

    onClick = (event) => {
        const {colName, onSortChange, type} = this.props;

        if (event.target !== event.currentTarget) {
            return;
        }

        this.setState(
            {order: this.state.order === 'asc' ? 'desc' : 'asc'},
            function() {
                onSortChange(colName, type, this.state.order);
            }
        );
    }

    onChange = (event) => {
        const {onFilterChange, colName, type} = this.props;
        const value = event.target.value;

        onFilterChange(value, colName, type);
    }

    render() {
        const {colName, sortable} = this.props;
        const humanizeColName = humanizeString(colName);

        return (
            <th onClick={sortable ? this.onClick : null}>
                {humanizeColName}
    
                {sortable &&
                    <FormControl 
                        type="text" 
                        placeholder={`Filter by ${humanizeColName}`}
                        onChange={this.onChange}
                    />
                }
            </th>
        );
    }
}

export default TableHead;