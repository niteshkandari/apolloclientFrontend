import React from 'react'
import Box from '@mui/material/Box';

const MUIBox = (props) => {
  const {BoxField, children} = props;  
  return (
    <Box {...BoxField}>{children}</Box>
  )
}

export default MUIBox