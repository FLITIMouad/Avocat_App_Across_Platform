import { useEffect } from "react";
import "../assets/scss/ClientDetail.scss";

import CaseDataTable from "../Components/ClientDetailComponents/CaseDataTabel";

const ClientDetail = () => {

useEffect(() => {
  
})



  return (
    <>
      <div className="ClientDetail-Container">
        <h1 className="ClientDetail-Title">المعلومات</h1>
        <div className="ClientDetail-Info">
          <div className="Info-Row">
            <div className="Info-inputGroup">
              <input id="_name" />
              <span> الأسم الكامل</span>
            </div>
            <div className="Info-inputGroup">
              <input id="_name"  disabled/>
              <span>العنوان</span>
            </div>
            <div className="Info-inputGroup">
              <input id="_name" />
              <span>الرقم الوطني</span>
            </div>
          </div>
          <div className="Info-Row">
            <div className="Info-inputGroup">
              <input id="_name" />
              <span>المدينة</span>
            </div>
            <div className="Info-inputGroup">
              <input id="_name" />
              <span>البريد الالكتروني</span>
            </div>
            <div className="Info-inputGroup">
              <input id="_name" />
              <span>نوع الزبون</span>
            </div>
          </div>
          <div className="Info-Row">
            <div className="Info-inputGroup">
              <input id="_name" />
              <span>رقم الهاتف</span>
            </div>
            <div className="Info-inputGroup">
              <input id="_name" />
              <span>2 رقم الهاتف</span>
            </div>
            <div className="Info-inputGroup">
              <input id="_name" />
              <span>3 رقم الهاتف</span>
            </div>
          </div>
        </div>
        <CaseDataTable />
      </div>
    </>
  );
};

export default ClientDetail;
