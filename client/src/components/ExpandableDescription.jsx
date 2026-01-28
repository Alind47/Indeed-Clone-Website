import { Box, Collapse, Typography } from "@mui/material";
import { useState } from "react"


const ExpandableDescription = ({text}) => {
    
    const [expanded, setExpanded] = useState(false);

    return(
        <Box>
            {!expanded && (
                <Typography>
                    {text.length > 150 ? text.substring(0, 150) : text}
                    {text.length > 150 && (
                        <Typography
                           component="span"
                           style={{color:'#1976d2', cursor:'pointer', marginLeft: 6 }}
                           onClick={() => setExpanded(true)}
                        >  + more 
                        </Typography>
                    )}
                </Typography>
            )}

            <Collapse in={expanded}>
               
               <Box style={{maxHeight:120, overflowY:'auto', margin:'10px 0', paddingRight: 6}} >
                 <Typography style={{color:'#6f6f6f'}}> {text} </Typography>
               </Box>
               
               <Typography 
                 style={{color:'#19762d', cursor:'pointer', fontSize: 14}}
                 onClick={() => setExpanded(false)} 
               > - less </Typography>
            </Collapse>
        </Box>
    )
}


export default ExpandableDescription;