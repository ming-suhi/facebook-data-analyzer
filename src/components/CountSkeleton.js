import React from "react";

class CountSkeleton extends React.Component {

  render() {
    return (
      <div flex="top space-evenly" className="count-skeleton">
        <div background="" edge="smooth"></div>
        <div background="" edge="smooth"></div>
      </div>
    )
  }
}

export default CountSkeleton;