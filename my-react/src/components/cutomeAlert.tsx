import {Snackbar, Alert} from '@mui/material';
import React, { useState, useEffect, SyntheticEvent } from 'react';

interface props {
  severity: 'success' | 'warning' | 'info' | 'error';
  message: string;
  autoHideDuration?: number;
  show: boolean;
  onClose?: (event : Event | SyntheticEvent<Element, Event> , reason: string| undefined) => void;
}

const CustomAlert = ({
    severity,
    message,
    autoHideDuration,
    show,
    onClose,
  }: props) => {
    const [open, setOpen] = useState(show);
  
    useEffect(() => {
      setOpen(show);
    }, [show]);
  
    const handleClose = (
      event: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
  
      if (onClose) {
        onClose(event, reason);
      }
    };
  
    return (
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    );
  };
  
  export default CustomAlert;