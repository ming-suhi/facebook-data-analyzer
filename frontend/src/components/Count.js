import React from "react";

class Count extends React.Component {

  async componentDidMount() {
    const res = await fetch(this.props.route);
    this.setState({count: await res.json()});
  }
  
  render() {
    return (
      <div flex="top space-evenly" text="center" className="count">

        {!this.state?.count && (<div background="" edge="smooth"></div>)}
        {!this.state?.count && (<div background="" edge="smooth"></div>)}

        {this.state?.count && (<div>{this.state?.count}</div>)}
        {this.state?.count && (<div>{this.props.label}</div>)}

      </div>
    )
  }
}

export default Count;