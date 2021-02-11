import React, { useState } from "react";
import axios from "axios";
import "./card.scss";
import "./form.scss";

const Form = ({ value, confirmed, innerText }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    team: "",
    quantity: "",
    textArea: "",
    website: "",
  });

  const r = /\d+/;
  const hour = Number(innerText.match(r)[0]);

  const start = [value.getFullYear(), value.getMonth(), value.getDate(), hour];

  console.log(start);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const { name, email, phoneNumber, team, quantity, textArea, website } = data;

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api", { data, start })
      .then((response) => console.log(response.data));
    // fetch("http://localhost:5000", { mode: "cors" })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    // fetch("http://localhost:5000/api", {
    //   mode: "cors",
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
  };

  return (
    <form className="calender">
      <div className="calender_title">Enter Details</div>
      <label htmlFor="name">Name *</label>
      <input onChange={handleChange} type="text" value={name} name="name" />
      <label htmlFor="email">Email *</label>
      <input onChange={handleChange} type="email" value={email} name="email" />
      <label htmlFor="number">Phone Number *</label>
      <input
        onChange={handleChange}
        type="number"
        value={phoneNumber}
        name="phoneNumber"
      />
      <label>What's your team size? *</label>
      <input onChange={handleChange} type="text" value={team} name="team" />
      <label>How many emails do you want to find/send monthly? *</label>
      <input
        onChange={handleChange}
        type="text"
        value={quantity}
        name="quantity"
      />
      <label>Any Specific Questions you have?</label>
      <textarea
        onChange={handleChange}
        value={textArea}
        name="textArea"
        cols="30"
        rows="10"
      ></textarea>
      <label htmlFor="email">Your Website (Optional)</label>
      <input
        onChange={handleChange}
        type="text"
        value={website}
        name="website"
      />
      <button onClick={submitHandler} className="btn">
        Schedule Event
      </button>
    </form>
  );
};

export default Form;
