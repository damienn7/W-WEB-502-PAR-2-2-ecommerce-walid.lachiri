import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Item from './Item'
import slides from './slider.json'
import './Carou.css'

function Example(props)
{
    return (
        <Carousel  navButtonsAlwaysVisible={true} swipe={true} animation='slide' className="carouselini">
            {
                slides.map( (item, i) => <Item key={item.id} item={item} />)
            }
        </Carousel>
    )
}

export default Example;