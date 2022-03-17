import styled from "styled-components";

export const customStyles = {
  tableWrapper: {
    style: {
      display: "flex",
      minHeight: "300px",
    },
  },
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: "#000",
      borderBottomWidth: "2px",
    },
  },
  header: {
    style: {
      fontSize: "30px",
      textAlign: "center",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#424d59",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#262d35",
      },
      div: {
        color: "#fff",
      },
      span: {
        color: "#fff",
      },
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: "#000",
      },
    },
  },
  cells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: "#000",
      },
    },
  },
};

export const TextField = styled.input`
  height: 34px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;
