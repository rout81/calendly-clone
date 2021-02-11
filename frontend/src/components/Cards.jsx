import React, { useState } from "react";
import "./card.scss";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ReactComponent as Video } from "../assets/video.svg";
import { ReactComponent as Clock } from "../assets/clock.svg";
import { ReactComponent as Cal } from "../assets/calendar.svg";
import { ReactComponent as Globe } from "../assets/globe.svg";
import { ReactComponent as Back } from "../assets/back.svg";
import Form from "./Form";

const Cards = () => {
  const [value, onChange] = useState(new Date());
  const [confirmed, setConfirmed] = useState(false);
  const [innerText, setInnerText] = useState("");

  let hour = Number(new Date().getHours());

  const handleClick = (e) => {
    setInnerText(e.target.innerText);
    setConfirmed(true);
  };

  const handleClickBack = () => {
    setConfirmed(false);
  };

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // let minute = Number(value.getMinutes());

  // if (minute > 30) {
  //   hour = hour + 1;
  //   minute = "00";
  //   console.log(minute === "00");
  // } else {
  //   minute = 30;
  // }

  // if (minute === "00") {
  //   console.log("its string");
  // }

  // const test = new Date(
  //   Number(value.getFullYear()),
  //   Number(value.getMonth()),
  //   Number(value.getDay()),
  //   Number(value.getHours()),
  //   Number(value.getMinutes())
  // );
  // console.log(test);

  return (
    <div className="container">
      <div className="card_content">
        {confirmed ? (
          <h2 className="back">
            <Back onClick={handleClickBack} className="back_svg" />
          </h2>
        ) : null}
        <h4 className="card_content-title">FutureBlink</h4>
        <h3>1 Hour Chat</h3>
        <div className="desc">
          <Video /> <h4>1 hour</h4>
        </div>
        <div className="desc">
          <Clock />{" "}
          <h4>Web conferencing details provided upon confirmation.</h4>
        </div>
        {confirmed ? (
          <>
            <div style={{ color: "rgb(6, 194, 156)" }} className="desc">
              <Cal />{" "}
              <h4>{`${innerText}, ${weekDays[value.getDay()]}, ${
                months[value.getMonth()]
              } ${value.getDate()}, ${value.getFullYear()} `}</h4>
            </div>
            <div className="desc">
              <Globe /> <h4>India Standard Time</h4>
            </div>
          </>
        ) : null}
      </div>

      {confirmed ? (
        <Form value={value} confirmed={confirmed} innerText={innerText} />
      ) : (
        <div className="calender">
          <div className="calender_title">Select a Date & Time</div>
          <div className="datetime">
            <div className="calender_component">
              <Calendar onChange={onChange} value={value} />
            </div>
            <div className="datetime_time">
              <div className="datetime_title">
                {`${weekDays[value.getDay()]}, ${
                  months[value.getMonth()]
                } ${value.getDate()}`}
              </div>
              <div className="time_container">
                <div onClick={handleClick}>
                  {hour + 1 > 12 ? `${hour + 1 - 12}PM` : `${hour + 1}AM`}
                </div>
                <div onClick={handleClick}>
                  {hour + 2 > 12 ? `${hour + 2 - 12}PM` : `${hour + 2}AM`}
                </div>
                <div onClick={handleClick}>
                  {hour + 3 > 12 ? `${hour + 3 - 12}PM` : `${hour + 3}AM`}
                </div>
                <div onClick={handleClick}>
                  {hour + 4 > 12 ? `${hour + 4 - 12}PM` : `${hour + 4}AM`}
                </div>
                <div onClick={handleClick}>
                  {hour + 5 > 12 ? `${hour + 5 - 12}PM` : `${hour + 5}AM`}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
