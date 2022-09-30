import React, { useState } from "react";
function Enter(props) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="enter">
      <label
        style={{
          color: focused ? "rgba(253, 177, 89, 1)" : "",
          paddingBottom: 5,
        }}
        className="labeel"
      >
        {props.label}
      </label>

      <input
        className="input-group inp"
        autoComplete="current-password"
        type={props.type}
        required
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      ></input>
    </div>
  );
}
export default Enter;
