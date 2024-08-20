import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Creator } from "../feature/creator";
import HomeLayout from "../layout/home";
import { CRM } from "../feature/listout";
import Setting from "../feature/setting";
import Login from "../feature/Auth/Login";
import { FormView } from "../feature/formView";

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<HomeLayout />}>
            <Route index element={<CRM />} />
            <Route path="creator" element={<Creator />} />
            <Route path="setting" element={<Setting />} />
          </Route>
          <Route path="/formView" element={<FormView />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};
