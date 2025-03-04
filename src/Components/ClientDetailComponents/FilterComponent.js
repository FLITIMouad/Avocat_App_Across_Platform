import { TextField } from "../../data/costumeStyle";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
const FilterComponent = ({
  filterText,
  onFilter,
  onClear,
  onExport,
  onClickAdd,
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
        onClick={(e) => onExport(e.target.value)}
      >
        <i className="fas fa-download"></i>تحميل البيانات
      </Button>
    </div>
  </>
);
export default FilterComponent;
