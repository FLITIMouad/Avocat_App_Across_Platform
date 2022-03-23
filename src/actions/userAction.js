import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_REQUEST,
} from "../constants/userConstants";
import axios from "axios";

export const Login = (email, password) =>async (dispatch) => {
  try {

    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const {data}=await axios.post("api/users/auth/login",{email,password},config);
    dispatch({type:USER_LOGIN_SUCCESS,payload:data});
    localStorage.setItem("da",JSON.stringify({name:data.name,isAdmin:data.isAdmin,key_f:data.token}))
   

  } catch (e) {
    dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
  }
};

export const Logout=()=>async(dispatch)=>{

    dispatch({ type: USER_LOGOUT_REQUEST });
    localStorage.removeItem("da") ;
}
