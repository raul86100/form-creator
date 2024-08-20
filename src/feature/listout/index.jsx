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
        <h2>My Forms</h2>
        <SimpleBtn
          title={"Create"}
          callback={() => navigate("/user/creator")}
        />
      </div>
      {isLoading ? (
        "loading"
      ) : (
        <>
          <section className="list-of-cards">
            {data?.map((item, index) => {
              return (
                <div key={index}>
                  <p>{index+1}</p>
                  <p>{item.templateName}</p>
                  <p>updatedAt:{item.updatedAt}</p> 
                  <p>createdby:{item.createdBy}</p> 
                  <span>Preview</span>
                  <span>Fill</span>      
                </div>
              );
            })}
          </section>
        </>
      )}
    </div>
  );
};
