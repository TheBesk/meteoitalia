import React from "react";

function Cities({ data, onItemClick }) {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <a
            href="#"
            onClick={() => onItemClick(item.lat, item.lon)}
          >
            {item.display_name.replace(item.county, "").replace(",", "").replace(", ,", ",")}
          </a>
        </div>
      ))}
    </div>
  );
}

export default Cities;