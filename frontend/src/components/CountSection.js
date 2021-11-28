import React from "react";
import CountSkeleton from "./CountSkeleton";

class CountSection extends React.Component {

  render() {
    return (
      <section flex="left space-evenly" text="center" container="" edge="smooth">
        <CountSkeleton />
        <CountSkeleton />
        <CountSkeleton />
        <CountSkeleton />
      </section>
    )
  }
}

export default CountSection;