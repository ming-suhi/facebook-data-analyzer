import React from "react";
import CountSection from "./CountSection";
import GraphSkeleton from "./GraphSkeleton";
import Table from "./Table";

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
          <Table route="/user/channels/rankedByMessages" labels={["#", "Channel", "Your Messages Count"]} />
        </section>
        <section flex="top center-x center-y" container="" edge="smooth" id="words-table">
          <Table route="/user/words/occurences" labels={["#", "Words", "Occurences"]} />
        </section>
      </main>
    )
  }
}

export default MainContainer;