/* eslint-disable jsx-a11y/anchor-is-valid */

import LocationOnIcon from "@mui/icons-material/LocationOn";
function SubDetails(props) {
  return (
    <div>
      <LocationOnIcon style={{ fontSize: "25", color: "#FDB159" }} />
      <a
        className="location"
        style={{
          color: "rgba(107, 114, 128, 1)",
          paddingLeft: 5,
        }}
      >
        {props.name}
      </a>
    </div>
  );
}

export default SubDetails;
<div></div>;
