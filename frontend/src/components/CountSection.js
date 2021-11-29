import React from "react";
import Count from "./Count";

class CountSection extends React.Component {

  render() {
    return (
      <section flex="left space-evenly" text="center" container="" edge="smooth">
        <Count route="/user/messages/encountered" label="messages encounter" />
        <Count route="/user/messages/received" label="messages received" />
        <Count route="/user/messages/sent" label="messages sent" />
        <Count route="/user/words/sent" label="words sent" />
      </section>
    )
  }
}

export default CountSection;