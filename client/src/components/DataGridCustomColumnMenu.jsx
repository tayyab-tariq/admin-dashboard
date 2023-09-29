import {
    GridColumnMenuContainer,
    GridColumnMenuFilterItem,
    GridColumnMenuHideItem
  } from "@mui/x-data-grid";
  
const DataGridCustomColumnMenu = (props) => {
  const { hideMenu, colDef, open } = props;
  
    return (
    <GridColumnMenuContainer
        hideMenu={hideMenu}
        colDef={colDef}
        open={open}
    >
        <GridColumnMenuFilterItem onClick={hideMenu} colDef={colDef} /> 
        <GridColumnMenuHideItem onClick={hideMenu} colDef={colDef} /> 
    </GridColumnMenuContainer>
  )
}

export default DataGridCustomColumnMenu