// React
import React, { Component } from 'react';

// Data table
import { DataTable } from 'react-data-components';

// API Methods
const api = require('../../api/endpoints');

export class JobTable extends Component {
  
  constructor(props) {
    super(props);
    this.state = { selected: '' };
  }

  selectRow = (row) => {
    this.setState({ selected: row.id });
    const donwloadUrl = api.downloadResultUrl(row.id);
    window.open(donwloadUrl, 'blank');
  }
  
  buildRowOptions = (row) => {
    return {
      onClick: this.selectRow.bind(this, row),
      className: this.state.selected === row.id ? 'active' : null
    };
  }

  render() {
    return (
      <div>
        <p>Click on a row to download results, if available</p>
        <p>{this.props.updateButton}</p>

        <br/>

        <DataTable keys="id"
                  buildRowOptions={this.buildRowOptions}
                  columns={this.props.columns}
                  initialData={this.props.initialData}
                  initialPageLength={10}
                  initialSortBy={this.props.initialSortBy} />
      </div>
    );
  }
}