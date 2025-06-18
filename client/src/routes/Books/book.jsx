import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";

function Books() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = "https://mern-book-app-iota.vercel.app/api/books";
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  console.log("data:", data);
  console.log("selectedCategory:", selectedCategory);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseURL;
        if (selectedCategory) {
          url = baseURL + `?category=${selectedCategory}`;
        }
        const response = await fetch(url);
        if (!response.ok)
          throw new Error("Erorr in fetching:", response.statusText);

        const jSondata = await response.json();

        setData(jSondata.books);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
        setError("Error in fetching data. Please try again");
      }
    };

    fetchData();
  }, [selectedCategory]);

  return (
    <div>
      <h1>Books</h1>
      <p>
        This is where we use Nodejs, Express & MongoDB to grap some data. data
        below is pulled from Mongo database
      </p>

      <Link to="/createbook" className="btn">
        + Add New Book
      </Link>

      <h2>Book Data sample</h2>

      <div className="filters">
        <label htmlFor="category">Categories</label>
        <select
          name="category"
          id=""
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="romance">Romance</option>
          <option value="science">Science</option>

          <option value="crime">Crime</option>
          <option value="food">Food</option>
          <option value="adventure">Adventure</option>

          <option value="thriller">Thriller</option>
          <option value="fiction">Fiction</option>
          <option value="other">Other</option>
        </select>
      </div>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="books">
          {data &&
            data.map((book) => (
              <li key={book._id}>
                <Link to={`/books/${book.slug}`}>
                  <img
                    src={`http://localhost:8000/uploads/${book.thumbnail}`}
                    alt={book.title}
                  />
                </Link>
                <h3>{book.title}</h3>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default Books;
