
import React from 'react'
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';



// css
const section1={
    width:"100%",
    height:"80px",
    lineHeight:"80px",
    backgroundColor:"#EC7700",
    boxShadow: "0px 1px 20px #A6A6A6",
    textAlign:"center",
    color:"rgba(255, 255, 255, 0.492)"
}
const date =new Date()
const currentYear=date.getFullYear()

function Footer() {
  return (
    <footer><div style={section1}><CopyrightOutlinedIcon /> Copyright reserved  {currentYear}</div></footer>
  )
}

export default Footer