import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Input(props){

    
    

    return (

      <Box
      component=""
      sx={{
        '& > :not(style)': { m: 1, width: props.width },
      }}
      noValidate
      autoComplete="off"
    >
     <TextField

      type={props.type}
     onChange={props.onChange}
     value={props.value}
     name={props.name}  
     id={props.id} 
aria-readonly={props.readonly}
hidden={props.hidden}
     label={props.label} 
     variant="standard" /> <br/>
     
     </Box>
    )
}

export default Input;