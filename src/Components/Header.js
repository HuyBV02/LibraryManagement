// import React from "react";

const Header = (props) => {
  const headerStyle = {
    position: "relative",
    left: 0,
    top: 0,
    width: "100%",
    background: "linear-gradient(to left, yellow, red)",
  };

  return (
    <div style={headerStyle}>
      <h2>Phạm Văn Hoàng</h2>
    </div>
  );
};

export default Header;
