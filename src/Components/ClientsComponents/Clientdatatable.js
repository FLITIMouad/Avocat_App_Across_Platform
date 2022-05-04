import DataTable, { createTheme } from "react-data-table-component";
import "../../assets/scss/Datatable.scss";
import React, { useState } from "react";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import AddClientModal from "./AddClientModal";
import EditClientModal from "./EditClientModal";
import { customStyles } from "../../data/costumeStyle";
import FilterComponent from "../FilterComponent";
import { DeleteClient } from "../../actions/clientsAction.js";
import { SemipolarSpinner } from "react-epic-spinners";
import { DELETE_CLIENT_RESET } from "../../constants/clientConstants.js";
import { downloadCSV } from "../../utils";


createTheme("solarized", {
  background: {
    default: "#fff",
    border: "1px solid #000",
  },
  context: {
    background: "#424d59",
    text: "#FFFFFF",
  },
  divider: {
    default: "#000",
  },
});



// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr

const Datatable = ({ Tabledata }) => {
  //selection-------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [data, setData] = useState(Tabledata);

  const addElm = (el) => {
    setData([...data, el]);
  };
  const dispatch = useDispatch();
  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
      omit: true,
    },
    {
      name: "الأسم الكامل",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "العنوان",
      selector: (row) => row.adress,
      sortable: true,
    },
    {
      name: "الرقم الوطني",
      selector: (row) => row.cin,
      sortable: true,
    },
    {
      name: "المدينة",
      selector: (row) => row.ville,
      sortable: true,
    },
    {
      name: "رقم الهاتف",
      selector: (row) => row.tel1,
      sortable: true,
    },
    {
      name: "رقم الهاتف",
      selector: (row) => row.tel2,
      sortable: true,
      omit: true,
    },
    {
      name: "رقم الهاتف",
      selector: (row) => row.tel3,
      sortable: true,
      omit: true,
    },
    {
      name: "البريد الالكتروني",
      selector: (row) => (row.email ? row.email : "nothing"),
      sortable: true,
    },
    {
      name: "نوع الزبون",
      selector: (row) => (row.physiqueClient ? "شخص" : " شركة"),
      sortable: true,
    },
    {
      name: "أجراءات",
      button: true,
      allowOverflow: true,
      cell: (row) => (
        <DropdownButton
          variant="outline-success"
          id="dropdown-basic-button"
          title="أجراءات"
        >
          <Dropdown.Item>
            <Button
              onClick={() => hundelEdit(row)}
              variant="outline-primary"
              className="DataTable-Button"
            >
              <i className="fas fa-pencil-alt"></i>
              تعديل
            </Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Button variant="outline-info" className="DataTable-Button">
              <i className="fas fa-info-circle" />
              المزيد
            </Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Button
              variant="outline-danger"
              className="DataTable-Button"
              onClick={() => deleteRow(row._id, row.name)}
            >
              <i className="fas fa-trash-alt" />
              حذف
            </Button>
          </Dropdown.Item>
        </DropdownButton>
      ),
    },
  ];
  const updatdel = useSelector((states) => states.delClient);
  const { loadingdel, successdel, clientdel, errordel } = updatdel;


  /****************Del Success********************* */
  if (successdel) {
    Swal.fire({
      title: "تم الحدف بنجاح",
      icon: "success",
      confirmButtonText: "نعم",
    });
    if (Tabledata) {
      const Res = Tabledata.filter((el) => el._id != clientdel._id);
      setData([...Res]);
    }

    dispatch({ type: DELETE_CLIENT_RESET });
  }


  /****************Del Error********************* */
  if (errordel) {
    /**************Error Message */
  }


  /*********************Delete ***********************/
  const deleteRow = (id, name) => {
    Swal.fire({
      title: `:هل أنت متأكد أنك تريد حذف\n ${name}`,
      showDenyButton: true,
      icon: "warning",
      confirmButtonText: "حذف",
      denyButtonText: `لا تحذف`,
      confirmButtonColor: "#d33",
      denyButtonColor: "#27E70D",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(DeleteClient(id));
      } else if (result.isDenied) {
        Swal.fire({
          title: `:لم يتم حدف\n\n ${name}`,
          icon: "error",
          confirmButtonText: "نعم",
          confirmButtonColor: "#27e70d",
        });
      }
    });
  };


  //Select Row----------------------------------------------------------------------------
  const handleRowSelected = React.useCallback((state) => {
    console.log("RowSelected",state.selectedRows)
    setSelectedRows(state.selectedRows);
  }, []);

  //----------------------------------------------------------------------------------
  const [filterText, setFilterText] = useState("");


  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  

  const filteredItems = data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );


  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        onExport={() => {
          selectedRows.map((r) => console.log(r));
          console.log("selected ",selectedRows.length);
          if (selectedRows.length>0)
          {
            downloadCSV(selectedRows)
            }
           
          else
          Swal.fire({
            title: `:يجب عليك اختيار العملاء`,
            icon: "info",
            confirmButtonText: "! حسنا",
            confirmButtonColor: "#27e70d",
          });
        }}
        onClickAdd={() => setAddModalShow(true)}
        type="إضافة زبون"
      />
    );
  }, [filterText, resetPaginationToggle]);
  //Selection---------------------------------------------------------------------------------
  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      Swal.fire({
        title: `:هل أنت متأكد أنك تريد الحذف\n `,
        showDenyButton: true,
        icon: "warning",
        confirmButtonText: "حذف",
        denyButtonText: `لا تحذف`,
        confirmButtonColor: "#d33",
        denyButtonColor: "#27E70D",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          selectedRows.forEach((res) => {
                console.log(res);
               })
          //dispatch(DeleteClient(id));
        } else if (result.isDenied) {
          Swal.fire({
            title: `:لم يتم الحذف\n\n `,
            icon: "error",
            confirmButtonText: "نعم",
            confirmButtonColor: "#27e70d",
          });
        }
      });
    };

    return (
      <Button
        key="delete"
        onClick={handleDelete}
        variant="danger"
        className="DataTable-Button"
      >
        <i className="fas fa-trash-alt" />
        Delete
      </Button>
    );
  }, [data, selectedRows, toggleCleared]);


  //----------------------------------------------------------------------------------
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [selectedRowSate, setSelectedRowState] = useState([{}, {}]);

  const hundelEdit = (row) => {
    setSelectedRowState([
      row,
      {
        _id: row._id,
        _name: row.name,
        _adress: row.adress,
        _cin: row.cin,
        _ville: row.ville,
        _tel1: row.tel1,
        _tel2: row.tel2,
        _tel3: row.tel3,
        _email: row.email,
        _physiqueClient: row.physiqueClient,
      },
    ]);
    setEditModalShow(true);
  };

  return (
    <>
      <DataTable
        title="قائمة الزبائن"
        noDataComponent="لايوجد بيانات"
        columns={columns}
        data={filteredItems}
        pagination // optionally, a hook to reset pagination to page 1
        subHeader
        persistTableHead
        paginationResetDefaultPage={resetPaginationToggle}
        subHeaderComponent={subHeaderComponentMemo}
        selectableRows
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        highlightOnHover
        pointerOnHover
        theme="solarized"
        contextMessage={{
          singular: "عدد الزبائن",
          plural: "عدد الزبائن",
          message: "المختارة",
        }}
        customStyles={customStyles}
        paginationComponentOptions={{
          rowsPerPageText: "عدد الصفوف في الصفحة:",
          rangeSeparatorText: "من",
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: "الكل",
        }}
      />
      {loadingdel && (
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
      <AddClientModal
        show={addModalShow}
        add={addElm}
        Swal={Swal}
        onHide={() => setAddModalShow(false)}
      />
      <EditClientModal
        show={editModalShow}
        selectedRow={selectedRowSate}
        Swal={Swal}
        onHide={() => setEditModalShow(false)}
      />
    </>
  );
};

export default Datatable;
