import React, { ReactNode } from "react";
import { Waypoint } from "react-waypoint";
// import { useMenu } from "@stores";

export const WaypointArea = ({ id, children }: SectionLayoutProps) => {
  // const updateMobileMenu = useMenu().setCurrentMenu;

  return (
    <>
      <Waypoint
        // onEnter={() => {
        //   console.log(id, "enter");
        // }}
        onEnter={() => {
          console.log("h");
        }}
        onLeave={({ currentPosition }) => {
          console.log(id, "enter");
          //   updateMobileMenu(id, "top", currentPosition);
        }}
      >
        <div className="absolute -top-1 h-[1px]" />
      </Waypoint>
      {children}
      <Waypoint
        onLeave={({ currentPosition }) => {
          console.log(id, "leave");
          //   updateMobileMenu(id, "bottom", currentPosition);
        }}
      >
        <div className="absolute top-[50vh] h-[1px]" />
      </Waypoint>
    </>
  );
};
