import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { useForm } from "react-hook-form";
import LoginSVG from "../assets/Svg/LoginSVG.svg";
import "../assets/scss/LoginScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../actions/userAction";
import { SemipolarSpinner } from "react-epic-spinners";

const LoginScreen = () => {
  const userinfo = useSelector((states) => states.userLogin);
  const { loading, userInfo, error } = userinfo;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const handleLogin = async (data) => {
    const email = data.UserName;
    const password = data.Password;

    dispatch(Login(email, password));
    if (userInfo) {
      history.push("/");
    } else {
      /*******Message email or password is incorrect *******/
    }
  };

  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  useEffect(() => {
    if (userInfo) history.replace(from);
  });
  return (
    <>
      <div className="Login-container">
        <div className="login-SVG">
          <img src={LoginSVG} alt="login_img" />
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className="login-form">
          <h1 className="login-title">تسجيل الدخول</h1>
          <input
            {...register("UserName", { required: "هذه الخانة ضرورية" })}
            id="UserName"
            className="login-input"
            placeholder="أسم المستخم"
          />
          {errors.UserName && <p>{errors.UserName.message}</p>}

          <input
            {...register("Password", { required: "هذه الخانة ضرورية" })}
            id="Password"
            className="login-input"
            placeholder="كلمة السر"
          />
          {errors.Password && <p>{errors.Password.message}</p>}
          <input className="login-button" type="submit" value="تسجيل الدخول" />
        </form>
      </div>
      {loading && (
        <div className="modal d-load fade  show d-flex justify-content-center ">
          <div className="row d-flex align-items-center">
            <div className="col-md-3 ml-auto modal-body">
              {" "}
              <SemipolarSpinner animationDelay={500} size={100} color="#fff" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginScreen;
