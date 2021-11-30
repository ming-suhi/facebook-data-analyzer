import React from "react";

// Header component
class Header extends React.Component {
  render() {
    return (
      <header flex="left center-y space-between" container="">
        <div>
          <h1>Facebook Data Analyzer</h1>
        </div>
        
        <nav>
          <a href="https://github.com/ming-suhi/facebook-data-analyzer" target="_blank">Repository</a>
          <a href="https://github.com/ming-suhi" target="_blank">Developer</a>
        </nav>
      </header>
    )
  }
}

export default Header;