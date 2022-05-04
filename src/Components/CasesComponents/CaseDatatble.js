import React, { useState } from 'react'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import DataTable,{ createTheme } from 'react-data-table-component';
import { SemipolarSpinner } from 'react-epic-spinners';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { customStyles } from '../../data/costumeStyle';
import FilterComponent from '../FilterComponent';


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
  
export const CaseDatatble = ({Tabledata}) => {
      //selection-------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [data, setData] = useState(Tabledata);
  //----------------------------------------------------------------------------------
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [selectedRowSate, setSelectedRowState] = useState([{}, {}]);
       
    
  const updatDelCase = useSelector((states) => states.delCase);
  const { loadingdel, successdel, casedel, errordel } = updatDelCase;
    
    
  const dispatch = useDispatch();
  const addElm = (el) => {
    setData([...data, el]);
    };
    const columns = [
        {
          name: "ID",
          selector: (row) => row._id,
          sortable: true,
          omit: true,
        },
        {
          name: "ر.ق",
          selector: (row) => row.NumDC,
          sortable: true,
        },
        {
          name: "ر.الوطني",
          selector: (row) => row.client.cin,
          sortable: true,
        },
        {
          name: "إسم الزبون",
          selector: (row) => row.client.name,
          sortable: true,
        },
        {
            name: "رقم الهاتف",
            selector: (row) => row.client.tel1,
            sortable: true,
          },
        {
          name: "إسم محامي الخصم",
          selector: (row) => row.nameConcure,
          sortable: true,
        },
        {
          name: "نوع القضية",
          selector: (row) => row?.typeofcase?.libelle,
          sortable: true,
          omit: true,
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


    /******************************************************************************Actions****************************************************************************** */
                                                /************* Edit *************/
    const hundelEdit = (row) => {
        setSelectedRowState([
          row,
          {
            _id: row._id,
            _numdc: row.NumDC,
            _nameconcure: row.nameConcure
          },
        ]);
        setEditModalShow(true);
    };
                                 /*****************Delete ********************/
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
       // dispatch(DeleteClient(id));
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
    /**************** Select Row **************** */
    const handleRowSelected = React.useCallback((state) => {
        console.log("RowSelected",state.selectedRows)
        setSelectedRows(state.selectedRows);
      }, []);

    
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
          //downloadCSV(selectedRows)
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
          type="إضافة قضية"
    />
  );
}, [filterText, resetPaginationToggle]);

/********************************************************************************************************************************** */
 
    return (
<>
    <DataTable
        title="قائمة القضايا"
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
      {/* {loadingdel && (
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
      )} */}
{/*       <AddClientModal
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
      /> */}
    </>
  )
}
