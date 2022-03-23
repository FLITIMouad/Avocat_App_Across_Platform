import axios from "axios";
import{GET_CASES_REQUEST,GET_CASES_SUCCESS,GET_CASES_FAIL, POST_CASE_REQUEST, POST_CASE_SUCCESS, POST_CASE_FAIL, PUT_CASE_REQUEST, PUT_CASE_SUCCESS, PUT_CASE_FAIL, DELETE_CASE_REQUEST, DELETE_CASE_FAIL, DELETE_CASE_SUCCESS, CASE_DETAIL_REQUEST, CASE_DETAIL_SUCCESS, CASE_DETAIL_FAIL} from "../constants/caseConstants.js"

export const GetCases =()=>async(dispatch)=>{

    try{
       dispatch({type: GET_CASES_REQUEST})
       const {key_f}=JSON.parse(localStorage.getItem("da"))
       const config = {
         "Content-Type": "application/json",
         headers: {
           Authorization: `Bearer ${key_f}`,
         },
       };
       const {data}=await axios.get("/api/cases",config);

       dispatch({type: GET_CASES_SUCCESS, payload: data});
    }catch(e){
        dispatch({
            type: GET_CASES_FAIL,
            payload:
              e.response && e.response.data.message
                ? e.response.data.message
                : e.message,
          });
    }

}

export const GetCase =(id)=>async(dispatch)=>{

    try{
       dispatch({type: CASE_DETAIL_REQUEST})
       const {key_f}=JSON.parse(localStorage.getItem("da"))
       const config = {
         "Content-Type": "application/json",
         headers: {
           Authorization: `Bearer ${key_f}`,
         },
       };
       const {data}=await axios.get(`/api/cases/client/${id}`,config);

       dispatch({type: CASE_DETAIL_SUCCESS, payload: data});
    }catch(e){
        dispatch({
            type: CASE_DETAIL_FAIL,
            payload:
              e.response && e.response.data.message
                ? e.response.data.message
                : e.message,
          });
    }

}

export const PostCase =(datareq)=>async(dispatch)=>{

    try{
       dispatch({type: POST_CASE_REQUEST})
       const {key_f}=JSON.parse(localStorage.getItem("da"))
       const config = {
         "Content-Type": "application/json",
         headers: {
           Authorization: `Bearer ${key_f}`,
         },
       };
       const {data}=await axios.post(`/api/cases/create`,datareq,config);

       dispatch({type: POST_CASE_SUCCESS, payload: data});
    }catch(e){
        dispatch({
            type: POST_CASE_FAIL,
            payload:
              e.response && e.response.data.message
                ? e.response.data.message
                : e.message,
          });
    }

}