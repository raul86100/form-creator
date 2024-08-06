import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Creator } from "../feature/creator";
import HomeLayout from "../layout/home";
import { CRM } from "../feature/listout";
import Setting from "../feature/setting";

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />} >
          <Route index element={<CRM />}/>
          <Route path="creator" element={<Creator/>} />
          <Route path="setting" element={<Setting />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
