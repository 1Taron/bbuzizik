import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function J_Checkbox({ label, initialChecked = false, onCheckChange }) {
  const [checked, setChecked] = useState(initialChecked);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onCheckChange) {
      onCheckChange(newChecked);
    }
  };

  const handleMouseDown = () => {
    setActive(true);
  };

  const handleMouseUp = () => {
    setActive(false);
  };

  return (
    <div
      style={{ display: "flex", cursor: "pointer", position: "relative" }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      {checked ? (
        <div
          style={{
            backgroundColor: "#64b5f6",
            border: "1px solid #868686",
            width: "18px",
            height: "18px",
            borderRadius: "3px",
            textAlign: "center",
            lineHeight: "11px",
          }}
        >
          <FontAwesomeIcon
            icon={faCheck}
            style={{ color: "white", fontSize: "14px", marginLeft: "1px" }}
          />
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #868686",
            width: "18px",
            height: "18px",
            borderRadius: "3px",
            textAlign: "center",
            lineHeight: "11px",
          }}
        >
          <FontAwesomeIcon
            icon={faCheck}
            style={{ color: "white", fontSize: "14px" }}
          />
        </div>
      )}

      <p
        style={{
          marginLeft: "10px",
          fontSize: "14px",
          alignSelf: "center",
          fontFamily: "omyu_pretty",
        }}
      >
        {label}
      </p>

      {active && (
        <div
          style={{
            position: "absolute",
            top: "-10px",
            left: "-10px",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            backgroundColor: "rgba(256, 256, 256, 0.05)",
            transition: "opacity 3s ease-in, transform 3s ease-in",
            zIndex: -1,
            opacity: active ? 1 : 0,
            transform: active ? "scale(1)" : "scale(0)",
          }}
        />
      )}
    </div>
  );
}

export default J_Checkbox;
