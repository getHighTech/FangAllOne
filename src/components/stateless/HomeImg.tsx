import React from 'react';
import "./homeimg.css";
import ReactSwiper from 'reactjs-swiper';
// import homeBannerStore from '../../mobx/components/HomeBannerStore';


const HomeImg =  (props:any)=>{
      const items = new Array();
      const banners = props.homebanners
      console.log(banners);
      banners.map((key:any)=>{
            console.log(key);
      })
        
      for(let i = 0; i<banners.length;i++){
             let obj = {image:banners[i],link:'www.baidu.com'}
            items.push(obj)
        }
       console.log(items);
       
      const swiperOptions = {
          preloadImages: true,
          autoplay: 8000,
          autoplayDisableOnInteraction: false
        };
  return(
        <div >
              <ReactSwiper  swiperOptions={swiperOptions} showPagination items={items}  className="swiper-example"/> 
        </div>

  )
    
  }

export default HomeImg