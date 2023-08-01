import { Paper, Button } from '@mui/material'
import React from 'react'

function Item({item})
{
    return (
        <Paper>
            <div style={{display:"flex",flexDirection: "column", justifyContent:"center"}}>
            <img src={item.image} alt={item.title}/>
            <h2>{item.title}</h2>
            {/* <p>{props.item.description}</p> */}
            <Button className="CheckButton">
                Check it out!
            </Button>
            </div>
        </Paper>
    )
}

export default Item