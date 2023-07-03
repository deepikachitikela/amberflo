import React from "react";
import { useLocation } from "react-router-dom";
import MetersForm from "../MetersForm/MetersForm";
import "./DetailsPage.css";
const DetailsPage = () => {
  const location = useLocation();
  const { item } = location.state;
  return (
    <div className="detailsPageContainer">
      <h1>Details Page</h1>
  {<MetersForm classForRows="meterFormRowVertical" item={item} btnName="Update Meter" update={true}/>}
    </div>
  );
};

export default DetailsPage;
