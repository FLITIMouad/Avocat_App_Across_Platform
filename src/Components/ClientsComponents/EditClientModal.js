import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import "../../assets/scss/AddClientModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { UpdateClient } from "../../actions/clientsAction.js";
import { SemipolarSpinner } from "react-epic-spinners";
import { PUT_CLIENT_RESET } from "../../constants/clientConstants";
const EditClientModal = (props) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm("");
  const [Id, SetId] = useState();

  const FillFileds = () => {
    const Client = props.selectedRow[1];

    SetId(Client._id);
    Object.keys(Client).forEach((key) => setValue(key, Client[key]));
  };
  const updatet = useSelector((states) => states.updateClient);
  const { loadingup, successup, clientup, errorup } = updatet;
  if (successup) {
    let rw = props.selectedRow[0];
    Object.keys(rw).forEach((key) => (rw[key] = clientup[key]));
    props.Swal.fire({
      title: "تمت تعديل الزبون بنجاح",
      icon: "success",
      confirmButtonText: "نعم",
      confirmButtonColor: "#27e70d",
    });
    dispatch({ type: PUT_CLIENT_RESET });
  } else if (errorup) {
    props.Swal.fire({
      title: "error",
      icon: "danger",
      confirmButtonText: "نعم",
      confirmButtonColor: "red",
    });
  }
  const handleData = async (data) => {
    data._id = Id;
    dispatch(UpdateClient(data));
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onShow={FillFileds}
      >
        <form onSubmit={handleSubmit(handleData)}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <i className="fas fa-user-edit" /> تعديل زبون
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 className="AddCLient-title">معلومات الزبون</h4>
            <h5 className="AddCLient-subtitle">
              (<span>*</span>) مطلوب
            </h5>
            <div className="AddCLient-form">
              <div className="AddCLient-inputGroup">
                <div className="AddCLient-inputAndError">
                  <div className="AddCLient-input">
                    <input
                      {...register("_name", {
                        required: "⚠  الاسم الكامل مطلوب",
                        minLength: {
                          value: 6,
                          message: "⚠ يجب أن يكون طول الاسم أكثر من 6 أحرف",
                        },
                      })}
                      id="_name"
                    />
                    <span>
                      <span>*</span> الأسم الكامل
                    </span>
                  </div>
                  <p>
                    <ErrorMessage errors={errors} name="_name">
                      {({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p key={type}>{message}</p>
                        ))
                      }
                    </ErrorMessage>
                  </p>
                </div>
                <div className="AddCLient-inputAndError">
                  <div className="AddCLient-input">
                    <input
                      {...register("_adress", {
                        required: "⚠  العنوان مطلوب",
                        minLength: {
                          value: 6,
                          message: "⚠ يجب أن يكون طول العنوان أكثر من 6 أحرف",
                        },
                      })}
                      id="_adress"
                    />
                    <span>
                      <span>*</span> العنوان
                    </span>
                  </div>
                  <p>
                    <ErrorMessage errors={errors} name="_adress">
                      {({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p key={type}>{message}</p>
                        ))
                      }
                    </ErrorMessage>
                  </p>
                </div>
                <div className="AddCLient-inputAndError">
                  <div className="AddCLient-input">
                    <input
                      {...register("_cin", {
                        required: "⚠  الرقم الوطني مطلوب",
                        /*pattern: {
                        value: /[A-Za-z]{3}/,
                        message: "error message cin", // JS only: <p>error message</p> TS only support string
                      },*/
                      })}
                      id="_cin"
                    />
                    <span>
                      <span>*</span> الرقم الوطني
                    </span>
                  </div>
                  <p>
                    <ErrorMessage errors={errors} name="_cin">
                      {({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p key={type}>{message}</p>
                        ))
                      }
                    </ErrorMessage>
                  </p>
                </div>
                <div className="AddCLient-inputAndError">
                  <div className="AddCLient-input">
                    <input
                      {...register("_ville", {
                        required: "⚠ المدينة  مطلوبة",
                      })}
                      id="_ville"
                    />
                    <span>
                      <span>*</span> المدينة
                    </span>
                  </div>
                  <p>
                    <ErrorMessage errors={errors} name="_ville">
                      {({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p key={type}>{message}</p>
                        ))
                      }
                    </ErrorMessage>
                  </p>
                </div>

                <div className="AddCLient-inputAndError">
                  <div className="AddCLient-input">
                    <select
                      id="_physiqueClient"
                      {...register("_physiqueClient")}
                    >
                      <option value={true}>شخص</option>
                      <option value={false}>شركة</option>
                    </select>
                    <span>
                      <span>*</span> نوع الزبون
                    </span>
                  </div>
                  <p>
                    <ErrorMessage errors={errors} name="_physiqueClient">
                      {({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p key={type}>{message}</p>
                        ))
                      }
                    </ErrorMessage>
                  </p>
                </div>
                <div className="AddCLient-inputAndError">
                  <div className="AddCLient-input">
                    <input
                      {...register("_tel1", {
                        required: "⚠ رقم الهاتف  مطلوب",
                        minLength: {
                          value: 10,
                          message:
                            "⚠ يجب أن يكون طول رقم الهاتف أكثر من 10 أرقام",
                        },
                      })}
                      id="_tel1"
                    />
                    <span>
                      <span>*</span> رقم الهاتف
                    </span>
                  </div>
                  <p>
                    <ErrorMessage errors={errors} name="_tel1">
                      {({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p key={type}>{message}</p>
                        ))
                      }
                    </ErrorMessage>
                  </p>
                </div>
                <div className="AddCLient-inputAndError">
                  <div className="AddCLient-input">
                    <input {...register("_tel2", {})} id="_tel2" />
                    <span>2 رقم الهاتف</span>
                  </div>
                </div>
                <div className="AddCLient-inputAndError">
                  <div className="AddCLient-input">
                    <input {...register("_tel3", {})} id="_tel3" />
                    <span>3 رقم الهاتف</span>
                  </div>
                </div>
                <div className="AddCLient-inputAndError">
                  <div className="AddCLient-input">
                    <input {...register("_email", {})} id="_email" />
                    <span>البريد الالكتروني</span>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              تعديل الزبون
            </Button>
            <Button variant="danger" onClick={props.onHide}>
              أغلق
            </Button>
          </Modal.Footer>
        </form>
        {loadingup && (
          <div className="modal d-load fade  show d-flex justify-content-center ">
            <div className="row d-flex align-items-center">
              <div className="col-md-3 ml-auto modal-body">
                {" "}
                <SemipolarSpinner
                  animationDelay={2000}
                  size={65}
                  color="#ff1d5e"
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default EditClientModal;
