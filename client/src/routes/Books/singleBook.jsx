import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

function SingleBook() {
  const [data, setData] = useState([]);
  const { slug } = useParams();

  const baseURL = `http://localhost:8000/api/books/${slug}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL);
        if (!response.ok)
          throw new Error("Erorr in fetching:", response.statusText);

        const jSondata = await response.json();
        console.log(jSondata, "JSONDATA");

        setData(jSondata.book);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const StartRating = ({ startRating }) => {
    const stars = [];

    for (let i = 0; i < startRating; i++) {
      stars.push(<span key={i}>⭐️</span>);
    }

    return <div>ratings: {stars}</div>;
  };

  return (
    <div>
      <Link to={"/books"} className="" style={{ marginBlock: "1rem" }}>
        🔙 Back
      </Link>

      {data &&
        data.map((book) => {
          return (
            <div key={book._id} className="bookdetails">
              <div className="col-2">
                <img
                  src={`http://localhost:8000/uploads/${book.thumbnail}`}
                  alt={book.title}
                />
                <br />

                <Link to={`/editbook/${book.slug}`}>✏️ Edit Book</Link>
              </div>
              {/* Edit book details */}
              <div className="col-2">
                <h1>{book.title}</h1>
                <p>{book.description}</p>

                {/* Stars */}
                <StartRating startRating={book.stars} />
                <p>Category</p>
                <ul>
                  {book.category.map((cat, i) => {
                    return <li key={i}>{cat}</li>;
                  })}
                </ul>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default SingleBook;
