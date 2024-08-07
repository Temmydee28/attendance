import * as React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Link(props){
    return (

        <Stack spacing={2} direction="row">
        <Button
       size="small"
       type="button">
        <a href={props.href} onClick={props.onClick}>{props.file}</a>
     </Button>
     </Stack>
       
    )
}
export default Link;