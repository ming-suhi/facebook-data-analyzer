import React from "react";
import CountSection from "./CountSection";
import GraphSkeleton from "./GraphSkeleton";
import TableSkeleton from "./TableSkeleton";

class MainContainer extends React.Component {

  render() {
    return (
      <main grid="" id="main-container">
        <CountSection />
        <section flex="top center-x center-y" container="" edge="smooth" id="yearly-chart">
          <GraphSkeleton />
        </section>
        <section flex="top center-x center-y" container="" edge="smooth" id="hourly-chart">
          <GraphSkeleton />
        </section>
        <section flex="top center-x center-y" container="" edge="smooth" id="channels-table">
          <TableSkeleton />
        </section>
        <section flex="top center-x center-y" container="" edge="smooth" id="words-table">
          <TableSkeleton />
        </section>
      </main>
    )
  }
}

export default MainContainer;