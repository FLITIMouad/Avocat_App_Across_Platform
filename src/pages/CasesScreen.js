import { useEffect } from "react";
import { SemipolarSpinner } from "react-epic-spinners";
import { useDispatch, useSelector } from "react-redux";
import "../assets/scss/CasesScreen.scss";
import {GetCases} from "../actions/caseAction"
import { CaseDatatble } from "../Components/CasesComponents/CaseDatatble";

const CasesScreen = () => {

  const CasesRes = useSelector((states) => states.getCases);
  const { loading, cases } = CasesRes;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCases());
  }, [dispatch]);


  return (
    <>
    <div className="Clients-Container">
      <h1 className="Clients-title">القضايا</h1>
      {loading ? (
        <div className="modal d-load fade  show d-flex justify-content-center ">
          <div className="row d-flex align-items-center">
            <div className="col-md-3 ml-auto modal-body">
              {" "}
              <SemipolarSpinner
                animationDelay={500}
                size={100}
                color="#fff"
                className="spinner"
              />
            </div>
          </div>
        </div>
      ) : (
        <CaseDatatble Tabledata={cases} />
      )}
    </div>
  </>
  );
};

export default CasesScreen;
