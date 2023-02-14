import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Img from '../../assets/Img1.jpg'
import "../../style/register.scss"
import data from '../../data/data'

class DemoCarousel extends Component {
render() {
return (
<Carousel className='slider' showThumbs={false} autoPlay={true} infiniteLoop={true} showArrows={false}>
    {data.img.map((e,i)=> <React.Fragment key={i}>
        <div>
            <img src={e} className='slider_img'/>
           
        </div>
    </React.Fragment>)}
</Carousel>
);
}
}


export default DemoCarousel
