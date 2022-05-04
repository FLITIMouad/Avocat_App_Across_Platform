import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {userAuthentificationReducer} from "./redux/userReduces"
import { DEL_Client, Detail_Client, Get_Clients, POST_Client, PUT_Client } from "./redux/clientReducers";
import { Del_Case, GET_Cases, INF_Case } from "./redux/caseReducers";



const reducers =combineReducers({
userLogin: userAuthentificationReducer,
    getClients: Get_Clients,
    creteClient: POST_Client,
    updateClient: PUT_Client,
    delClient: DEL_Client,
    infoClient: Detail_Client,

    getCases: GET_Cases,
    delCase:Del_Case,
    detailCase: INF_Case
});

const userInfo= localStorage.getItem("da") ? localStorage.getItem("da") : undefined;


const initialState = {
    userLogin:{userInfo}
}






const middleware=[thunk];

const store=createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;