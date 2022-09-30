/* eslint-disable no-unused-vars */
import React, { useState } from "react";
function InpNew(props) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="enter">
      <input
        required={true}
        className="input-groupAd  formNew"
        autoComplete="current-password"
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.place}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      ></input>
    </div>
  );
}

export default InpNew;
