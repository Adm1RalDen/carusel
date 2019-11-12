import React, { Component } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

///
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

///
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
//
export default class SimpleSlider extends Component {
  calendarComponentRef = React.createRef();
  state = {
    pages: [1, 2, 3],
    currentDate: 12,
  };
  onSwipe = side => {
    const { pages } = this.state;
    let { currentDate } = this.state
    // let calendarApi = this.calendarComponentRef.current.getApi();
    if (side === "left") {
      pages.push(this.state.pages[this.state.pages.length - 1] + 1);
      pages.shift();
      currentDate--
      // calendarApi.next(); 
    } else {  
      pages.unshift(this.state.pages[0] - 1);
      pages.pop();
      currentDate--
      // calendarApi.prev();
    }
    this.setState({ pages, currentDate }, () => {
      this.setState({ fetching: true })
      setTimeout(() => {
        this.setState({ fetching: false })
      }, 0)
    });
  };
  settings = {
    dots: true,
    infinite: true,
    speed: 400,
    initialSlide: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    onSwipe: this.onSwipe
  };
  
  // goPrev = () => {
  //   console.log('prev')
  //   let calendarApi = this.calendarComponentRef.current.getApi();
  //   calendarApi.incrementDate({days: 1})
  // }
  renderCalendar = (item) => {
    if (item !== 2 && this.state.fetching) return
    const date = item === 2 
      ? `11/${this.state.currentDate}/2019` 
      : item === 1 
        ? `11/${this.state.currentDate - 1}/2019` 
        : `11/${this.state.currentDate + 1}/2019` 

    return (
      <div className="demo-app-calendar">
        <FullCalendar
          defaultView="timeGridDay"
          defaultDate={new Date(date)}
          header={{
            left: " ",
            center: "title",
            right: " "
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={this.calendarComponentRef}
        />
      </div>
    )
  }
  render() {
    
    console.log("pages", this.state.currentDate);
    return (
      <div>
        <h2> Carusel</h2>
        <div className="containerCarusel">
          <Slider {...this.settings}>
            
            {[
              "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
              "https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
              "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
              "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
              "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            ].map(item => (
              <div key={item}>
                <span>{this.state.pages[2]}</span>
                <img src={item} alt="slide" />
              </div>
            ))}

            {/* {[1,2,3].map(item =>(
              <>
              <div className="demo-app">
              <div className="demo-app-prev-button">
                <button onClick={this.goPrev}>Prev</button>
              </div>
              {this.renderCalendar(item)}
            </div>
            </>
            ))} */}
            
          </Slider>
        </div>
      </div>
    );
  }
}
{/* {[
              "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
              "https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
              "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
              "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
              "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            ].map(item => (
              <div key={item}>
                <span>{this.state.pages[2]}</span>
                <img src={item} alt="slide" />
              </div>
            ))} */}

// ----------------------------------------------------------------
// import ReactSiema from 'react-siema'
// import './App.css'
// const pages = [
//   "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   "https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
// ];
// const Slide = (props) => <img {...props} alt="slide" />

// export default (props) => {
//     const options = {
//         duration: 500,
//         loop: true
//     }
//     return <ReactSiema {...options}>
//         {pages.map(item => {
//             return <Slide src={item} />
//         })}
//     </ReactSiema>
// }

//----------------------------------------------------------------------------
// import clamp from "lodash-es/clamp";
// import { useSprings, animated } from "react-spring";
// import { useGesture } from "react-with-gesture";
// import "./App.css";
// const pages = [
//   "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   "https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
// ];

// export default () => {
//   const index = useRef(0);
//   const [propsValue, setPropsValue] = useSprings(pages.length, i => ({
//     x: i * window.innerWidth,
//     sc: 1,
//     display: "block"
//   }));
//   const bind = useGesture(
//     ({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
//       if (down && distance > window.innerWidth / 2)
//         cancel(
//           (index.current = clamp(
//             index.current + (xDir > 0 ? -1 : 1),
//             0,
//             pages.length - 1
//           ))
//         );
//       setPropsValue(i => {
//         const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0);
//         const sc = down ? 1 - distance / window.innerWidth / 2 : 1;
//         if (i < index.current - 1 || i > index.current + 1){
//             i = index.current - 1;
//             pages.sort()
//           // return { display: "none" };
//         }
//         return { x, sc, display: "block" };
//       });
//     }
//   );
//   return propsValue.map(({ x, display, sc }, i) => (
//     <animated.div
//       {...bind()}
//       key={i}
//       style={{
//         display,
//         transform: x.interpolate(x => `translate3d(${x}px,0,0)`)
//       }}
//     >
//       <animated.div
//         style={{
//           transform: sc.interpolate(s => `scale(${s})`),
//           backgroundImage: `url(${pages[i]})`
//         }}
//       />
//     </animated.div>
//   ));
// };
