import React from 'react'
import Login from "../Components/Login"
import BgImg from "../Components/BgImg"

function LoginPage() {
    return (
        <BgImg children={<Login/>}/>
    )
}

export default LoginPage
