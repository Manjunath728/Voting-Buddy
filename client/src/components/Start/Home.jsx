import React from 'react'
import homeCover from "../images/home-cover.jpg"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fontSize, padding } from '@mui/system';
import { Link, Outlet } from 'react-router-dom';
import Footer from "../footer/Footer";

const theme = createTheme({
    palette: {
        or: {
          main: "#EC7700"
        }
  }
})
// css section
const section={
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "repeat"

}
const sectionWarp={
    padding:"75px 20px 75px 20px",
    margin:"0 40px 0 40px"

}
const sectionInnerWarp={
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    flexWrap: "wrap",
}
const innerSectionLeft={
    width: "50%",
    justifyContent: "center"
    
}
const innerSectionRight={
    width: "50%",
    textAlign:"right"
    
}
const innerSection={
    width: "33.33%",
    textAlign:"start",
    justifyContent: "center",
    padding:"20px"
    
}
const innerSectionH={
    
    fontSize:"28px",
    lineHeight:"38px",
    fontWeight:"600",
    color:"#2C2C2C"
}
const innerSectionP={
    margin :"18px 0 17px 0",
    fontSize:"18px",
    lineHeight:"30px",
    fontWeight:"400",
    color:"#8D8D8D"
    
}
const Buttons={
    padding:"",
    justifyContent: "center"
    
}



function Home() {
    return (<>
        <div style={section}>
            <div style={sectionWarp}>
                <div style={sectionInnerWarp}>
                <div style={innerSectionLeft}>
                    <h2 style={
                    {
                        color:"#FF9021",
                        fontSize:"24px",
                        fontFamily:"Inter",
                        lineHeight:"34px",
                        fontWeight:"700",
                        verticalAlign:"baseLine",
                        textAlign:"start",

                        
                    }}>Trusted By Big  Organizations like GFGC</h2>
                <h1 style={
                    {
                        fontSize:"48px",
                        fontFamily:"Carter One",
                        lineHeight:"58px",
                        fontWeight:"400",
                        textAlign:"start",
                        color:"#00263A",
                        

                        
                    }}>Easy Online Election Excellence</h1>
                <p style={
                    {
                        fontSize:"18px",
                        fontFamily:"Inter",
                        lineHeight:"30px",
                        fontWeight:"400",
                        textAlign:"start",
                        
                        
                        
                        
                        
                    }}>ElectionBuddy guarantees election integrity, boosts voter engagement and saves serious hours.Highly integerated results</p>
                    <div style={Buttons}>
                    <ThemeProvider theme={theme}>
                    <Stack direction="row" spacing={5}>
                   <Link to="/card"> <Button  variant="contained"color="or"  sx={{color:"white" }} endIcon={""}>
                     Get started 
               </Button></Link>
                    </Stack>
                    </ThemeProvider>
                    </div>
                    </div>
                    <div  style={innerSectionRight}>
                    <img  style={{ width:"500px",maxWidth:"500px"}}src={homeCover} alt="home"/>
                    </div>
                </div>
            </div>
        </div>
        <div style={{...section,fontSize:"25px",
                        fontFamily:"Carter One",
                        lineHeight:"58px",
                        color:"#00263A",
                        fontWeight:"400",
                        textAlign:"center",}}>
                    <h1>Take your Votes to the Next Level</h1>
        </div>
        <div style={section}>
            <div style={{...sectionWarp,padding:"5px 20px 5px 20px"}}>
                <div style={sectionInnerWarp}>
                <div  style={innerSection}>
                    <h1 style={innerSectionH}>Improve voter engagement</h1>
                    <p style={innerSectionP}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum sapiente quos possimus voluptatum amet fuga eum esse, placeat consequatur quae?</p>
                </div>
                <div  style={innerSection}>
                    <h1 style={innerSectionH}>High-integrity voting</h1>
                    <p style={innerSectionP}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum sapiente quos possimus voluptatum amet fuga eum esse, placeat consequatur quae?</p>
                </div>
                <div  style={innerSection}>
                    <h1 style={innerSectionH}>Flexible Ballots</h1>
                    <p style={innerSectionP}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum sapiente quos possimus voluptatum amet fuga eum esse, placeat consequatur quae?</p>
                </div>
                </div>
                <div style={sectionInnerWarp}>
                <div  style={innerSection}>
                    <h1 style={innerSectionH}>Automated and simple</h1>
                    <p style={innerSectionP}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum sapiente quos possimus voluptatum amet fuga eum esse, placeat consequatur quae?</p>
                </div>
                <div  style={innerSection}>
                    <h1 style={innerSectionH}>Real-time results</h1>
                    <p style={innerSectionP}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum sapiente quos possimus voluptatum amet fuga eum esse, placeat consequatur quae?</p>
                </div>
                <div  style={innerSection}>
                    <h1 style={innerSectionH}>Secure and private</h1>
                    <p style={innerSectionP}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum sapiente quos possimus voluptatum amet fuga eum esse, placeat consequatur quae?</p>
                </div>
                </div>  
                
            </div>
        </div>
        
        </> )
}

export default Home