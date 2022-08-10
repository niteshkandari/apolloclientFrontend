import React from 'react'
import Button from '@mui/material/Button';

const MUIButton = (props) => {
 const { buttonFields, children } = props;  
 return (
    <Button {...buttonFields}>{children}</Button>
  )
}

export default MUIButton