import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/createBook.css"

const CreateBook = () => {
  const [book, setBook] = useState({
    title: "",
    describe: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
      setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    // console.log(book);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/createbook", book)
            navigate("/");
        } catch (err) {
            console.error(err);
        }

    }

  return (
    <div className="App">
        <div className="form">
        <h1>Add new book</h1>
        <input type="text" placeholder="title" name="title" onChange={handleChange}/>
        <input type="text" placeholder="describe" name="describe" onChange={handleChange}/>
        <input type="number" placeholder="price" name="price" onChange={handleChange}/>
        <input type="text" placeholder="cover" name="cover" onChange={handleChange}/>
        <button className="formButton" onClick={handleClick}>Add</button>
        </div>
    </div>
  );
};

export default CreateBook;
