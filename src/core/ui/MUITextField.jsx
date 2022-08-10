import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const MUITextField = (props) => {
    const {field} = props;
  return (
    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <TextField style={{color: 'white'}} {...field} />
  </Box>
  )
}

export default MUITextField