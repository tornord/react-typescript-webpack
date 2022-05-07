import React from "react";
import "./Badge.scss";
// import "./fonts/GothamRounded-Book.woff";

interface BadgeProps {
  value: string;
}

export default function Badge({ value }: BadgeProps) {
  return (
    <div className={`badge ${!value ? "badge--none" : ""} `}>
      <h4 className="heavy">{value || 0}</h4>
    </div>
  );
}
