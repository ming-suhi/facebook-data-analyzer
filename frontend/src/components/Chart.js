import React from "react";
import PropTypes from 'prop-types';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

// Skeleton for chart
class ChartSkeleton extends React.Component {
  render() {
    return (
      <div grid="" className="chart-skeleton">
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
 * Render chart populated with data from route
 * @param {string} route 
 * @returns Chart
 */
const renderChart = async(route) => {
  // Fetch data from route
  const res = await fetch(route);
  const {data, options} = await res.json();
  // Return chart with data
  return (<Bar data={data} options={options}/>);
}



// Chart component
class Chart extends React.Component {

  // Proptypes
  static propTypes = {
    // Route to chart data
    route: PropTypes.string.isRequired
  }


  // Render data after mount
  async componentDidMount() {
    this.chart = await renderChart(this.props?.route);
    this.setState({loaded: true});
  }


  // Render component
  render() {
    return (
      <div>
        {/* Skeleton content */}
        {!this.state?.loaded && <ChartSkeleton />}

        {/* Dynamic content */}
        {this.state?.loaded && this.chart}
      </div>
    )
  }
}

export default Chart;