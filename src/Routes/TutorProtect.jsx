import { Navigate } from "react-router-dom";

import React from 'react'

function TutorProtect(props) {
if(localStorage.getItem('tutortoken')){
    return props.children
}else{
    return <Navigate to='/vendor/'/>
}
}

export default TutorProtect