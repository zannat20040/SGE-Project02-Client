import { Breadcrumbs } from "@material-tailwind/react";
import React from "react";
import { MdSpaceDashboard } from "react-icons/md";

export default function BreadcrumsLayout({ route1, activeroute2 }) {
  return (
    <Breadcrumbs className="text-sm bg-transparent">
      <MdSpaceDashboard className="text-gray-400 text-lg"/>
      <span className="text-gray-400  font-medium">{route1}</span>
      <span className="text-primary-color  font-medium">{activeroute2}</span>
    </Breadcrumbs>
  );
}
