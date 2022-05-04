import { TextField } from "../data/costumeStyle";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
const FilterComponent = ({
    filterText,
    onFilter,
    onClear,
    onExport,
  onClickAdd,
    type
  }) => (
    <>
      <div className="DataTable-FilterBar">
        <TextField
          id="search"
          type="text"
          placeholder="البحت"
          aria-label="Search Input"
          value={filterText}
          onChange={onFilter}
        />
        <button
          variant="outline-primary"
          className="DataTable-ClearButton"
          onClick={onClear}
        >
          <i className="fas fa-backspace"></i>
        </button>
        <Button
          variant="outline-primary"
          className="DataTable-Button"
          onClick={onExport}
        >
          <i className="fas fa-download"></i>تحميل البيانات
        </Button>
        <Button
          variant="outline-success"
          className="DataTable-Button"
          onClick={() => onClickAdd(true)}
        >
        <i className="fas fa-user-plus"></i>{type}
        </Button>
      </div>
    </>
  );
  export default FilterComponent;