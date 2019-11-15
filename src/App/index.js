import React, { Component } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import events from './data.js'

export default class SimpleSlider extends Component {
  calendarComponentRef0 = React.createRef();
  calendarComponentRef1 = React.createRef();
  calendarComponentRef2 = React.createRef();
  state = {
    pages: [0, 1, 2],
  };

  dates = [new Date('11/11/2019'), new Date('11/12/2019'), new Date('11/13/2019')]

  setNextDate = (index, plus) => {
    let next
    if (plus) {
      next = index + 1
      if (next === 3) {
        next = 0
      }
    } else {
      next = index - 1
      if (next === -1) {
        next = 2
      }
    }
    
    let prevApi = this['calendarComponentRef' + index].current.getApi();
    const today = prevApi.getDate()
    const newToday = new Date(today.setDate(today.getDate() + (plus ? 1 : -1)))
    this.dates[next] = newToday
    // console.log('this.dates', this.dates)
  }

  afterChange = midIndex => {
    this.setNextDate(midIndex, this.side === 'left')
    this.setState({ midIndex, refresh: true }, () => {
      this.setState({ refresh: false })
    })
  }

  onSwipe = side => {
    this.side = side
  }

  settings = {
    afterChange: this.afterChange,
    onSwipe: this.onSwipe,
    slidesToScroll: 1,
    initialSlide: 1,
    slidesToShow: 1,
    infinite: true,
    dots: true,
    speed: 100,
  };
  

  renderCalendar = item => {
    const { midIndex, refresh } = this.state

    return item !== midIndex && refresh ? null : (
      <div className="demo-app-calendar">
        <div onClick={() => {
          let calendarApi = this['calendarComponentRef' + item].current.getApi();
          console.log('calendarApi.getDate()', calendarApi.getDate())
        }}>test</div>

        <FullCalendar
          header={{ left: " ", center: "title", right: " " }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={this['calendarComponentRef' + item]}
          defaultDate={this.dates[item]}
          defaultView="timeGridDay"
          events={events}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <h2> Carusel</h2>
        <div className="containerCarusel">
          <Slider {...this.settings}>
            {[0, 1, 2].map(item => (
              <div key={item}>
                {this.renderCalendar(item)}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}
