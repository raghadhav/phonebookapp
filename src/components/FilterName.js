import React from "react";
const Filtername = (props) => {
  return (
    <div>
      Search: <input onChange={props.handleFilter} type="text" />
    </div>
  );
};

export default Filtername;
