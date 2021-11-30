import Footer from "./components/Footer";
import Header from "./components/Header";
import Count from "./components/Count";
import Chart from "./components/Chart";
import Table from "./components/Table";

function App() {
  return (
    <div id="main-page" grid="" background="" theme-color="dark">
      <Header />
      <main grid="" id="main-container">
        <section flex="left space-evenly" text="center" container="" edge="smooth">
          <Count route="/user/messages/encountered" label="messages encounter" />
          <Count route="/user/messages/received" label="messages received" />
          <Count route="/user/messages/sent" label="messages sent" />
          <Count route="/user/words/sent" label="words sent" />
        </section>
        <section container="" edge="smooth">
          <Chart route="/user/messages/sent-per-year/chart-data" />
        </section>
        <section container="" edge="smooth">
          <Chart route="/user/messages/sent-per-hour/chart-data" />
        </section>
        <section flex="top center-x center-y" container="" edge="smooth">
          <Table route="/user/channels/rankedByMessages" labels={["#", "Channel", "Your Messages Count"]} />
        </section>
        <section flex="top center-x center-y" container="" edge="smooth">
          <Table route="/user/words/occurences" labels={["#", "Words", "Occurences"]} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;