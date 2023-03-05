import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NewCategory from "./NewCategory.";
import StarRateIcon from "@mui/icons-material/StarRate";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import SchoolIcon from "@mui/icons-material/School";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StarBorderIcon from '@mui/icons-material/StarBorder';
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

export default function CategoriesMenu({ addCategory, categoriesList }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [custom, setCustom] = React.useState(false);

  const handleCustomClose = () => {
    setCustom(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}>
        Categories
      </Button>
      <StyledMenu onKeyDown={(e) => e.stopPropagation()}
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuItem onKeyDown={(e) => e.stopPropagation()} onClick={handleClose} disableRipple>
          <StarRateIcon />
          Default
        </MenuItem>
        <MenuItem onKeyDown={(e) => e.stopPropagation()} onClick={handleClose} disableRipple>
          <SchoolIcon />
          Exam Notes
        </MenuItem>
        <MenuItem onKeyDown={(e) => e.stopPropagation()} onClick={handleClose} disableRipple>
          <FormatQuoteIcon />
          Quotes
        </MenuItem>
        {categoriesList.map((category) => {
          return (
            <MenuItem onKeyDown={(e) => e.stopPropagation()} key={category} onClick={handleClose} disableRipple>
              <StarBorderIcon />
              {category}
            </MenuItem>
          );
        })}
        {!custom ? (
          <MenuItem onKeyDown={(e) => e.stopPropagation()} onClick={handleCustomClose} disableRipple>
            <DashboardCustomizeIcon />
            Custom Category
          </MenuItem>
        ) : (
          <MenuItem onKeyDown={(e) => e.stopPropagation()}  disableRipple
          >
            
            <NewCategory addCategory={addCategory} style={{ margin: "8px" }} />
          </MenuItem>
        )}
      </StyledMenu>
    </div>
  );
}
// (!custom) ? (<MenuItem onClick={handleCustomClose} disableRipple>
//   <DashboardCustomizeIcon />
//   Custom Category
// </MenuItem>) : (<NewCategory addCategory={addCategory} style={{margin:'8px'}}/>)
