import React from 'react';
import PropTypes from 'prop-types';

// Skeleton for table
class TableSkeleton extends React.Component {

  render() {
    return (
      <div grid="" className="table-skeleton">
        <div background="" edge="smooth"></div>
        <div background="" edge="smooth"></div>
        <div background="" edge="smooth"></div>
        <div background="" edge="smooth"></div>
        <div background="" edge="smooth"></div>
        <div background="" edge="smooth"></div>
        <div background="" edge="smooth"></div>
        <div background="" edge="smooth"></div>
        <div background="" edge="smooth"></div>
        <div background="" edge="smooth"></div>
        <div background="" edge="smooth"></div>
        <div background="" edge="smooth"></div>
        <div background="" edge="smooth"></div>
        <div background="" edge="smooth"></div>
        <div background="" edge="smooth"></div>
      </div> 
    )
  }
}



/**
 * Render table head populated with data from an array
 * @param {array<string>} labels 
 * @returns Table head
 */
const renderHead = (labels) => {

  /**
   * Callback function for mapped array
   * @param {string} data 
   * @param {number} index 
   * @returns Table header 
   */
  const renderChild = (data, index) => {
    return (
      <th key={index}>{data}</th>
    )
  }

  // Return table head with data
  return (
    <thead>
      <tr>
        {labels.map(renderChild)}
      </tr>
    </thead>
  )
};



/**
 * Render table body populated with data from route
 * @param {string} route 
 * @returns Table body
 */
const renderBody = async(route) => {
  // Fetch data from route
  const res = await fetch(route);
  const data = await res.json();

  /**
   * Callback function for fetched mapped data
   * @param {{name: string, count: number}} data
   * @param {number} index 
   * @returns Table row with data
   */
  const renderChild = (data, index) => {
    // Index starts at 0, ranking starts at 1
    // Add 1 to index to get rank
    const rank = index + 1;
    // Limit long strings
    const name = data.name.length > 25 ? data.name.substring(0, 25) + "..." : data.name;
    // Data count
    const count = data.count;
    // Return table row with data
    return (
      <tr key={index}>
        <th>{rank}</th>
        <td>{name}</td>
        <td text="center">{count}</td>
      </tr>
    )
  };

  // Return all data inside table body
  return (
    <tbody>
      {data.map(renderChild)}
    </tbody>
  );
}



// Table component
class Table extends React.Component {

  // Proptypes
  static propTypes = {
    // Route to table data
    route: PropTypes.string.isRequired,
    // Table labels
    labels: PropTypes.arrayOf(PropTypes.string).isRequired
  };


  // Render data after mount
  async componentDidMount() {
    this.setState({
      loaded: true,
      head: await renderHead(this.props?.labels),
      body: await renderBody(this.props?.route)
    });
  }

  
  // Render component
  render() {
    return (
      <div flex="top center-x center-y">
        {!this.state?.loaded && <TableSkeleton />}
        {this.state?.loaded && (
          <table>
            {this.state?.head}
            {this.state?.body}
          </table>
        )}
      </div>
    );
  }
}

export default Table;