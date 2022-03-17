import axios from "axios";

import {
  GET_CLIENTS_REQUEST,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAIL,
  POST_CLIENT_REQUEST,
  POST_CLIENT_SUCCESS,
  POST_CLIENT_FAIL,
  PUT_CLIENT_SUCCESS,
  PUT_CLIENT_REQUEST,
  PUT_CLIENT_FAIL,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_REQUEST,
  DELETE_CLIENT_FAIL,
  CLIENT_DETAIL_REQUEST,
  CLIENT_DETAIL_SUCCESS,
  CLIENT_DETAIL_FAIL,
} from "../constants/clientConstants.js";

export const Clients = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CLIENTS_REQUEST });
    const {key_f}=JSON.parse(localStorage.getItem("da"))

    const config = {
      headers: {
        Authorization: `Bearer ${key_f}`,
      },
    };
    const { data } = await axios.get("/api/clients/", config);
    dispatch({ type: GET_CLIENTS_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: GET_CLIENTS_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};
export const AddClient = (dataReq) => async (dispatch) => {
  try {
    dispatch({ type: POST_CLIENT_REQUEST });
    const {key_f}=JSON.parse(localStorage.getItem("da"))
    const config = {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${key_f}`,
      },
    };
    const { data } = await axios.post("/api/clients/create", dataReq, config);

    dispatch({ type: POST_CLIENT_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: POST_CLIENT_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};


export const UpdateClient = ( dataReq) => async (dispatch) => {
  try {
    dispatch({ type: PUT_CLIENT_REQUEST });
     const {key_f}=JSON.parse(localStorage.getItem("da"))
    
    const config = {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${key_f}`,
      },
    };
    const { data } = await axios.put("/api/clients/edit", dataReq, config);

    dispatch({ type: PUT_CLIENT_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: PUT_CLIENT_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const DeleteClient = ( id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CLIENT_REQUEST });
    const dataReq={
      _id: id,
      _dateArch:new Date(Date.now())
    };
     const {key_f}=JSON.parse(localStorage.getItem("da"))
    
    const config = {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${key_f}`,
      },
    };
    const { data } = await axios.put("/api/clients/edit", dataReq, config);

    dispatch({ type: DELETE_CLIENT_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: DELETE_CLIENT_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};


export const Client_Detail=(id)=>async(dispatch)=>{
 try{
            dispatch({ type:CLIENT_DETAIL_REQUEST})
            const {key_f}=JSON.parse(localStorage.getItem("da"))
    
            const config = {
              "Content-Type": "application/json",
              headers: {
                Authorization: `Bearer ${key_f}`,
              },
            };

            const {data}= await axios.get(`/api/clients/${id}`,config);
            dispatch({ type:CLIENT_DETAIL_SUCCESS,payload:data})

 }catch(e){

  dispatch({
    type:CLIENT_DETAIL_FAIL,
    payload:
      e.response && e.response.data.message
        ? e.response.data.message
        : e.message,
  });
 }


}