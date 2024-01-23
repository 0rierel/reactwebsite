import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { MenuItem, TextField, InputAdornment, IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import styles from "./dropDownMenu.module.css"; 
import { useState } from "react";

interface props<T> {
  objArr: T[];
  onSelectChange: (selectedItem: T | null) => void;
  labelText: string;
  sx?: SxProps<Theme>; 
  idKey: keyof T;
  displayKey: keyof T;
}

const DropDownMenu = <T,>({
  objArr,
  onSelectChange,
  labelText,
  sx,
  idKey,
  displayKey,
}: props<T>) => {
  const [open, setOpen] = useState(false);

  const handleSelectChange = (selectedItemId: string) => {
    const selectedItem = objArr.find(
      (item) => String(item[idKey]) === selectedItemId
    );
    onSelectChange(selectedItem || null);
  };
 
  return (
    <TextField
      className={styles.dropDownMenu} 
      select
      type="search"
      label={labelText}
      onChange={(e) => handleSelectChange(e.target.value as string)}
      sx={sx}
      SelectProps={{
        IconComponent: () => (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setOpen((prevOpen) => !prevOpen)}
              tabIndex={-1}
              edge="end"
            >
              {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>
          </InputAdornment>
        ),
        open,
        onClose: () => setOpen(false),
        onOpen: () => setOpen(true),
      }}
    >
      {objArr.map((item) => (
        <MenuItem  key={String(item[idKey])} value={String(item[idKey])}>
          {String(item[displayKey]) }
        </MenuItem>
      ))}
    </TextField>
  );
};

export default DropDownMenu;
