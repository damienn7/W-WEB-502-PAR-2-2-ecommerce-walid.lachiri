import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Item from './Item'
import slides from './slider.json'

function Example(props)
{
    return (
        <Carousel>
            {
                slides.map( (item, i) => <Item key={item.id} item={item} /> )
            }
        </Carousel>
    )
}

export default Example;