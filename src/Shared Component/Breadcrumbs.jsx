import React from "react";

export default function Breadcrumbs({routeLabel, routePath}) {
  return (
    <div>
        <h1 className="text-primary-color font-bold text-2xl">{routeLabel}</h1>
        <p className="text-sm text-gray-400">{routePath}</p>

    </div>
  );
}
