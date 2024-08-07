import React, { useState } from "react";
import Signin from "./Signin";

import Link from "./Link";
import SignUp from "./Signup";


function Form(){
const [renderForm, setRenderForm] = useState(false)

function renderPage(){

    setRenderForm(true);

}
function isrenderPage(){

    setRenderForm(false);

}


    return ( 
        <div>
    <form method="post" className="form-container">
    {renderForm? <SignUp /> : <Signin />  }
    
   
    
    <Link 
   onClick={renderForm? isrenderPage: renderPage}
    file={renderForm? "SIGNIN": "SIGNUP"}
   />
   </form>
    </div>
    )
}
export default Form;