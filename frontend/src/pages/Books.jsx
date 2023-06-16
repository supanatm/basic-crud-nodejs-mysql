import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import "../styles/book.css"

const Books = () => {

    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        const fetchAllBooks =  async () => {
            try {
                const respone = await axios.get(import.meta.env.VITE_BACKEND_URL + "/books")
                // console.log(respone);
                setBooks(respone.data);
            } catch (err) {
                console.error(err)
            }
        }
        fetchAllBooks();
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(import.meta.env.VITE_BACKEND_URL + "/deletebook/" + id)
            window.location.reload()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='App'>
            <div className='book-container'>
                <h1>Test Books Shop</h1>
                <div className="books">
                    {books.map(book => (
                        <div className="book" key={book.id}>
                            {book.cover && <img src={book.cover} alt="" />}
                            <h2>{book.title}</h2>
                            <p>{book.describe}</p>
                            <span>{book.price}</span>
                            <button className='edit'><Link to = {`/editbook/${book.id}`}>Edit</Link></button>
                            <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
                        </div>
                    ))}
                </div>
                <div className='add'>
                    <a href='/creatbook'>
                        Add new book
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Books