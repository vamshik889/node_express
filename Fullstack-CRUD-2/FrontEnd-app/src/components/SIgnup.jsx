import React, { useState } from "react";

const SIgnup = () => {
  const obj = {
    name: "",
    age: "",
    email: "",
    password: "",
  };

  const [details, setDetails] = useState(obj);
  const [message,setMessage]  = useState("")

 
  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);
    let newObj = { ...details, [name]: value };
    setDetails(newObj);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8181/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      if(!res.ok){
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      else{
        let data = await res.json()
        setMessage(data.message);
        console.log(message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter name"
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="enter email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="enter password"
          name="password"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="enter age"
          name="age"
          onChange={handleChange}
        />
        <input type="submit" placeholder="submit"  />
      </form>
      {message&&<div>{message}</div>}
    </div>
  );
};

export default SIgnup;
