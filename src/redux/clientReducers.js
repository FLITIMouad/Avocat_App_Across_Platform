import {
  GET_CLIENTS_REQUEST,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAIL,
  GET_CLIENTS_RESET,
  POST_CLIENT_REQUEST,
  POST_CLIENT_SUCCESS,
  POST_CLIENT_FAIL,
  POST_CLIENT_RESET,
  PUT_CLIENT_REQUEST,
  PUT_CLIENT_SUCCESS,
  PUT_CLIENT_FAIL,
  PUT_CLIENT_RESET,
  DELETE_CLIENT_REQUEST,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL,
  DELETE_CLIENT_RESET,
  CLIENT_DETAIL_RESET,
  CLIENT_DETAIL_FAIL,
  CLIENT_DETAIL_SUCCESS,
  CLIENT_DETAIL_REQUEST,
} from "../constants/clientConstants.js";

export const Get_Clients = (state = { clients: [] }, action) => {
  switch (action.type) {
    case GET_CLIENTS_REQUEST:
      return { loading: true };
    case GET_CLIENTS_SUCCESS:
      return { loading: false, clients: action.payload };
    case GET_CLIENTS_FAIL:
      return { loading: false, error: action.payload };
    case GET_CLIENTS_RESET:
      return { clients: [] };
    default:
      return state;
  }
};
export const POST_Client = (state = {}, action) => {
  switch (action.type) {
    case POST_CLIENT_REQUEST:
      return { loadingadd: true };
    case POST_CLIENT_SUCCESS:
      return { loadingadd: false, successadd: true, clientAdd: action.payload };
    case POST_CLIENT_FAIL:
      return { loading: false, error: action.payload };
   case POST_CLIENT_RESET:
      return { };
    default:
      return state;
  }
};



export const PUT_Client = (state = {}, action) => {
    switch (action.type) {
      case PUT_CLIENT_REQUEST :
        return { loadingup: true };
      case PUT_CLIENT_SUCCESS:
        return { loadingup: false, successup: true, clientup: action.payload };
      case PUT_CLIENT_FAIL:
        return { loadingup: false, errorup: action.payload };   
     case PUT_CLIENT_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const DEL_Client = (state = {}, action) => {
    switch (action.type) {
      case DELETE_CLIENT_REQUEST :
        return { loadingdel: true };
      case DELETE_CLIENT_SUCCESS:
        return { loadingdel: false, successdel: true, clientdel: action.payload };
      case DELETE_CLIENT_FAIL:
        return { loadingdel: false, errordel: action.payload };   
     case DELETE_CLIENT_RESET:
        return {};
      default:
        return state;
    }
  };

  export const Detail_Client = (state = {}, action) => {
    switch (action.type) {
      case CLIENT_DETAIL_REQUEST :
        return { loading  : true };
      case CLIENT_DETAIL_SUCCESS:
        return { loading: false, client: action.payload };
      case CLIENT_DETAIL_FAIL:
        return { loading: false, error: action.payload };   
     case CLIENT_DETAIL_RESET:
        return {};
      default:
        return state;
    }
  };