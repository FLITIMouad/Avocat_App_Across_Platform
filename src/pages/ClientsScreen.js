import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "../assets/scss/ClientsScreen.scss";
import DataTable from "../Components/ClientsComponents/Clientdatatable";
import { Clients } from "../actions/clientsAction.js";
import { useSelector } from "react-redux";
import { SemipolarSpinner } from "react-epic-spinners";
const ClientsScreen = () => {
  const ClientsRes = useSelector((states) => states.getClients);
  const { loading, clients } = ClientsRes;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Clients());
  }, [dispatch]);

  return (
    <>
      <div className="Clients-Container">
        <h1 className="Clients-title">الزبائن</h1>
        {loading ? (
          <div className="modal d-load fade  show d-flex justify-content-center ">
            <div className="row d-flex align-items-center">
              <div className="col-md-3 ml-auto modal-body">
                {" "}
                <SemipolarSpinner
                  animationDelay={500}
                  size={100}
                  color="#fff"
                />
              </div>
            </div>
          </div>
        ) : (
          <DataTable Tabledata={clients} />
        )}
      </div>
    </>
  );
};

export default ClientsScreen;
