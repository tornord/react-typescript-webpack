import React from "react";
import "./Badge.css";

interface BadgeProps {
  value: string;
}

export function Badge({ value }: BadgeProps) {
  return (
    <div className={`badge ${!value ? "badge--none" : ""} `}>
      <h4 className="heavy">{value || 0}</h4>
    </div>
  );
}
