import React from "react";
import "./Alert.css";
import { FiAlertTriangle } from "react-icons/fi";
export default function Alert(props) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="Alert">
        <FiAlertTriangle className="Alert_icon" />
        <p className="Alert_text">{props.text}</p>
      </div>
    </div>
  );
}
