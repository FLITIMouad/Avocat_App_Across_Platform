import DataTable, { createTheme } from "react-data-table-component";
import "../../assets/scss/Datatable.scss";
import React, { useState } from "react";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { customStyles } from "../../data/costumeStyle";
import FilterComponent from "./FilterComponent";
import { DeleteClient } from "../../actions/clientsAction.js";
import { SemipolarSpinner } from "react-epic-spinners";
import { DELETE_CLIENT_RESET } from "../../constants/clientConstants.js";
import Tabledata from "../../data/client";
import {  downloadCSV } from "../../utils";

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


const CaseDataTable = () => {
  //selection------------------------------------------------------------------------- 
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [data, setData] = useState(Tabledata);
  //----------------------------------------------------------------------------------


  const dispatch = useDispatch();
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
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
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "الرقم الوطني",
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: "المدينة",
      selector: (row) => row.level,
      sortable: true,
    },

    {
      name: "أجراءات",
      button: true,
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


  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);


  
  //----------------------------------------------------------------------------------
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
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
        onExport={() => {  downloadCSV(selectedRows) }}
        onClickAdd={() => setAddModalShow(true)}
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
        className="DataTable-Button"
        onClick={handleDelete}
        variant="danger"
      >
        <i className="fas fa-trash-alt" />
        Delete
      </Button>
    );
  }, [data, selectedRows, toggleCleared]);

  
  //table-----------------------------------------------------------------------------
 
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
        title="قائمة قضايا الزبون"
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
    </>
  );
};

export default CaseDataTable;
