import React from "react";
import "../assets/scss/MainScreen.scss";
import MainSVG from "../assets/Svg/MainSVG.svg";


const MainScreen = ({children}) => {
  return (
    <>
      <div className="Main-Container">
        <div className="Main-SVG">
          <img src={MainSVG} alt="bg"/>
        </div>
        <div className="Main-Pages">
         {children}
        </div>
      </div>
    </>
  );
};

export default MainScreen;
