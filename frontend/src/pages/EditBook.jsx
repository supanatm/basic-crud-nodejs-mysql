import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/createBook.css";

const EditBook = () => {
  const [book, setBook] = useState({
    title: "",
    describe: "",
    price: 0,
    cover: "",
  });

  const navigate = useNavigate();
  // const location = useLocation();

  // const pathname = location.pathname.split("/");
  const { id } = useParams();
  // console.log(id)

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // console.log(book);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(import.meta.env.VITE_BACKEND_URL + "/editbook/" + id, book);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchBookById = async () => {
        try {
          const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/book/" + id);
          setBook(...response.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchBookById();
    }
  }, [id]);

  return (
    <div className="App">
      <div className="form">
        <h1>Update book</h1>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={book.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="describe"
          name="describe"
          value={book.describe}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="price"
          name="price"
          value={book.price}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="cover"
          name="cover"
          value={book.cover}
          onChange={handleChange}
        />
        <button className="formButton" onClick={handleClick}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditBook;
