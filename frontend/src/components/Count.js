import React from "react";
import PropTypes from 'prop-types';

/**
 * Render count content populated with data from route
 * @param {string} route 
 * @param {string} label 
 * @returns Count content
 */
const renderCount = async(route, label) => {
  // Fetch data
  const res = await fetch(route);
  const count = await res.json();

  // Return content with data
  return (
    <React.Fragment>
      <div>{count}</div>
      <div>{label}</div>
    </React.Fragment>
  )
}



// Count component
class Count extends React.Component {

  // Proptypes
  static propTypes = {
    // Route to count data
    route: PropTypes.string.isRequired,
    // Count label
    label: PropTypes.string.isRequired
  };


  // Render content after mount
  async componentDidMount() {
    this.content = await renderCount(this.props?.route, this.props?.label);
    this.setState({loaded: true});
  }
  

  // Render component
  render() {
    return (
      <div flex="top space-evenly" text="center" className="count">
        {/* Skeleton content */}
        {!this.state?.loaded && (
          <React.Fragment>
            <div background="" edge="smooth"></div>
            <div background="" edge="smooth"></div>
          </React.Fragment>
        )}

        {/* Dynamic content */}
        {this.state?.loaded && this.content}

      </div>
    )
  }
}

export default Count;