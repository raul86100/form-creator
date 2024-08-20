import React from "react";
import "./index.scss";
import SimpleBtn from "../../compound/Buttons/simpleBtn";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllFrom } from "../../appSlice";

export const CRM = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["getallform"],
    queryFn: fetchAllFrom,
  });
  console.log(data);
  return (
    <div>
      <div className="crm">
        My Forms
        <SimpleBtn
          title={"Create"}
          callback={() => navigate("/user/creator")}
        />
      </div>
      {isLoading ? "loading" : <h2>data fetched</h2>}
    </div>
  );
};
