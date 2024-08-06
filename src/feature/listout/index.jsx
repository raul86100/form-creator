import React from "react";
import "./index.scss";
import SimpleBtn from "../../compound/Buttons/simpleBtn";
import { useNavigate } from "react-router-dom";

export const CRM = () => {
  const navigate=useNavigate();
  return (
    <div className="crm">
      My Forms
      <SimpleBtn title={"Create"} callback={()=>navigate('/creator')}/>
    </div>
  );
};
