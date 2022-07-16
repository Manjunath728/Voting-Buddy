import { color } from '@mui/system'
import React from 'react'
import {NavLink} from "react-router-dom"

function HeaderLinks(props) {
  return (
    <li  style={{cursor: "pointer" }} ><NavLink style={({isActive})=>{
      return{color: isActive?"#EC7700":"grey",borderBottom:isActive?"2px solid #EC7700":"" }
    }} className="a" to={props.route}>{props.name}</NavLink></li>
  )
}

export default HeaderLinks