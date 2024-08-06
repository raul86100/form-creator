import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.scss";
import { SiFormspree } from "react-icons/si";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoSettings } from "react-icons/io5";

const HomeLayout = () => {
  const navigate = useNavigate();
  const DashItems = [
    { icons: <MdFormatListBulletedAdd size={38} />, name: "CRM", link: "/" },
    { icons: <IoSettings size={38} />, name: "Setting", link: "/setting" },
  ];
  const handleNavigate = (link) => {
    navigate(link);
  };

  return (
    <div className="home-layout">
      <header className="header">
        <SiFormspree />
        FORMS
      </header>
      <div className="app-body">
        <div className="side-bar-outer">
          <ul>
            {DashItems.map((item, index) => {
              return (
                <li key={index} onClick={() => handleNavigate(item.link)}>
                  {item.icons}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="outlet-view">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
