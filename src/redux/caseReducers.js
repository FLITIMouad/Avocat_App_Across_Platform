import{GET_CASES_REQUEST,GET_CASES_SUCCESS,GET_CASES_FAIL, POST_CASE_REQUEST, POST_CASE_SUCCESS, POST_CASE_FAIL, PUT_CASE_REQUEST, PUT_CASE_SUCCESS, PUT_CASE_FAIL, DELETE_CASE_REQUEST, DELETE_CASE_FAIL, DELETE_CASE_SUCCESS, CASE_DETAIL_REQUEST, CASE_DETAIL_SUCCESS, CASE_DETAIL_FAIL} from "../constants/caseConstants.js"


export const GET_Cases=(state = {cases:[]}, action)=>{
    switch(action.type)
    {
       case GET_CASES_REQUEST:
           return {loading: true};
       case GET_CASES_SUCCESS:
            return {loading: false,cases: action.payload};
       case GET_CASES_FAIL:
           return {loading: false,error: action.payload};
       default:
           return state;

    }
}
export const POST_Case=(state = {}, action)=>{
    switch(action.type)
    {
       case POST_CASE_REQUEST:
           return {loading: true};
       case POST_CASE_SUCCESS:
            return {loading: false,success: true,case: action.payload};
       case POST_CASE_FAIL:
           return {loading: false,error: action.payload};
       default:
           return state;

    }
}

export const PUT_Case=(state = {}, action)=>{
    switch(action.type)
    {
       case PUT_CASE_REQUEST:
           return {loading: true};
       case PUT_CASE_SUCCESS:
            return {loading: false,success: true,case: action.payload};
       case PUT_CASE_FAIL:
           return {loading: false,error: action.payload};
       default:
           return state;

    }
}


export const Del_Case=(state = {}, action)=>{
    switch(action.type)
    {
       case DELETE_CASE_REQUEST:
           return {loadingdel: true};
       case DELETE_CASE_SUCCESS:
            return {loadingdel: false,successdel: true,casedel: action.payload};
       case DELETE_CASE_FAIL:
           return {loadingdel: false,errordel: action.payload};
       default:
           return state;

    }
}


export const INF_Case=(state = {}, action)=>{
    switch(action.type)
    {
       case CASE_DETAIL_REQUEST:
           return {loading: true};
       case CASE_DETAIL_SUCCESS:
            return {loading: false,success: true,case: action.payload};
       case CASE_DETAIL_FAIL:
           return {loading: false,error: action.payload};
       default:
           return state;

    }
}