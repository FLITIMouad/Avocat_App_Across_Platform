import Button from "@restart/ui/esm/Button";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Logout } from "../actions/userAction";
import "../assets/scss/SideBar2.scss";

const Sidebar = ({ useAuthent }) => {
  const user = useAuthent().user;
  const dispatch = useDispatch();
  const history = useHistory();
  var CurrentLink = window.location.pathname.split("/");
  CurrentLink = CurrentLink[1];
  const [selectedLinkState, setSelectedLinkStaet] = useState(CurrentLink);
  useEffect(() => {
    var all = document.querySelectorAll(".list");
    for (var i = 0; i < all.length; i++) {
      all[i].classList = "list";
    }
    if (document.getElementById(selectedLinkState) != null)
      document.getElementById(selectedLinkState).className = "list active";
  }, [window.location.pathname]);

  const handelLogout = (e) => {
    e.preventDefault();
    dispatch(Logout());
    history.replace("/login");
  };
  const hundelToggle = () => {
    let Navigation = document.querySelector(".navigation");
    Navigation.classList.toggle("active");
  };

  return (
    <>
      {user ? (
        <div className="navigation">
          <div
            className="toggle"
            onClick={() => {
              hundelToggle();
            }}
          >
            <i className="fas fa-bars fa-2x"></i>
          </div>
          <ul>
            <li id="home" className="list ">
              <b></b>
              <b></b>
              <Link
                to="/"
                onClick={() => {
                  setSelectedLinkStaet("home");
                }}
              >
                <span className="icon">
                  <i className="fas fa-home  fa-lg"></i>
                </span>
                <span className="title">الرئيسية</span>
              </Link>
            </li>
            <li id="client" className="list ">
              <b></b>
              <b></b>
              <Link
                to="/client"
                onClick={() => {
                  setSelectedLinkStaet("client");
                }}
              >
                <span className="icon">
                  <i className="fas fa-user-tie   fa-lg" />
                </span>
                <span className="title">العملاء</span>
              </Link>
            </li>
            <li id="Cases" className="list ">
              <b></b>
              <b></b>
              <Link
                to="/Cases"
                onClick={() => {
                  setSelectedLinkStaet("Cases");
                }}
              >
                <span className="icon">
                  <i className="fas fa-suitcase  fa-lg" />
                </span>
                <span className="title">القضايا</span>
              </Link>
            </li>
            <li id="Files" className="list ">
              <b></b>
              <b></b>
              <Link
                to="/Files"
                onClick={() => {
                  setSelectedLinkStaet("Files");
                }}
              >
                <span className="icon">
                  <i className="fas fa-file-alt  fa-lg" />
                </span>
                <span className="title">الملفات</span>
              </Link>
            </li>
            <li id="Sessions" className="list ">
              <b></b>
              <b></b>
              <Link
                to="/Sessions"
                onClick={() => {
                  setSelectedLinkStaet("Sessions");
                }}
              >
                <span className="icon">
                  <i className="fas fa-gavel  fa-lg" />
                </span>
                <span className="title">الجلسات</span>
              </Link>
            </li>
            <li id="ClientDetail" className="list ">
              <b></b>
              <b></b>
              <Link
                to="/ClientDetail?id=546"
                onClick={() => {
                  setSelectedLinkStaet("ClientDetail");
                }}
              >
                <span className="icon">
                  <i className="fas fa-gavel  fa-lg" />
                </span>
                <span className="title">الجلسات</span>
              </Link>
            </li>
            <li id="logout" className="list ">
              <b></b>
              <b></b>
              <a href="#" onClick={handelLogout}>
                <span className="icon">
                  <i className="fas fa-sign-out-alt  fa-lg" />
                </span>
                <span className="title">تسجيل الخروج</span>
              </a>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Sidebar;
