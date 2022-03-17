import Button from "@restart/ui/esm/Button";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Logout } from "../actions/userAction";
import "../assets/scss/SideBar.scss";

const Sidebar = ({ useAuthent }) => {
  const user = useAuthent().user;
  const dispatch = useDispatch();
  const history = useHistory();
  const handelLogout = (e) => {
    e.preventDefault();
    dispatch(Logout());
    history.replace("/login");
  };
  return (
    <>
      {user ? (
        <div className="Main-slidebar">
          <input id="hamburger" className="hamburger" type="checkbox" />
          <label htmlFor="hamburger" className="hamburger">
            <i></i>
            <text is="x3d">
              <open is="x3d">القائمة</open>
            </text>
          </label>
          <nav className="primnav">
            <ul>
              <li>
                <Link to="/">
                  <div className="icon">
                    <i className="fas fa-home  fa-lg"></i>
                  </div>{" "}
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/client">
                  <div className="icon">
                    <i className="fas fa-user-tie   fa-lg"></i>
                  </div>{" "}
                  العملاء
                  <div className="tag">53</div>
                </Link>
              </li>
              <li>
                <Link to="/Cases">
                  <div className="icon">
                    <i className="fas fa-suitcase  fa-lg"></i>
                  </div>{" "}
                  القضايا
                  <div className="tag">53</div>
                </Link>
                <ul className="secnav">
                  <li>
                    <Link to="/">كل المراحل</Link>
                  </li>
                  <li>
                    <Link to="/">المرحلة الابتدائية</Link>
                  </li>
                  <li>
                    <Link to="/">مرحلة الاستئناف</Link>
                  </li>
                  <li>
                    <Link to="/">مرحلة النقد</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/Files">
                  <div className="icon">
                    <i className="fas fa-file-alt  fa-lg"></i>
                  </div>{" "}
                  الملفات
                  <div className="tag">53</div>
                </Link>
              </li>
              <li>
                <Link to="/Sessions">
                  <div className="icon">
                    <i className="fas fa-gavel  fa-lg"></i>
                  </div>{" "}
                  الجلسات
                  <div className="tag">53</div>
                </Link>
              </li>
              <li>
                <a href="" onClick={handelLogout}>
                  <div className="icon">
                    <i className="fas fa-sign-out-alt  fa-lg"></i>
                  </div>{" "}
                  تسجيل الخروج
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Sidebar;
