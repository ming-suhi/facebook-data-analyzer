import React from 'react';
import PropTypes from 'prop-types';

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

class Table extends React.Component {

  // Proptypes
  static propTypes = {
    route: PropTypes.string.isRequired,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  // Return table head with labels
  renderHead() {

    const renderChild = (label, index) => {
      return (<th key={index}>{label}</th>);
    };

    return (
      <thead>
        <tr>
          {this.props?.labels.map(renderChild)}
        </tr>
      </thead>
    );
  };

  // Return table body with data
  async renderBody() {
    const res = await fetch(this.props?.route);
    const data = await res.json();

    const renderChild = (data, index) => {
      const rank = index + 1;
      const name = data.name.length > 25 ? data.name.substring(0, 25) + "..." : data.name;
      const count = data.count;

      return (
        <tr key={index}>
          <th>{rank}</th>
          <td>{name}</td>
          <td text="center">{count}</td>
        </tr>
      )
    };

    return (
      <tbody>
        {data.map(renderChild)}
      </tbody>
    );
  };

  // Render data after mount
  async componentDidMount() {
    const head = await this.renderHead();
    const body = await this.renderBody();
    this.setState({
      loaded: true,
      head: head,
      body: body
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