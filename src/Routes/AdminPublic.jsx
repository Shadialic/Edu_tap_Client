import React from 'react'

import {Navigate} from 'react-router-dom'

function AdminPublic(props) {
    if(localStorage.getItem('admintoken')){
        return<Navigate to='/admin/dashboard'/>
    }else{
        <Navigate to='/admin'/>
        return props.children
    }
}

export default AdminPublic