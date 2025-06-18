import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";

function SingleBook() {
  const [data, setData] = useState([]);
  const { slug } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [bookId, setBookId] = useState("");
  const navigate = useNavigate();

  const baseURL = `https://mern-book-app-iota.vercel.app/api/books/${slug}`;

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

  const handleDeleteBook = async (e) => {
    e.preventDefault();
    setIsDeleting(true);
    try {
      const response = await fetch(
        `https://mern-book-app-iota.vercel.app/api/books/${bookId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setIsDeleting(false);
        setShowModal(false);
        navigate("/books");
      }
    } catch (error) {
      console.log(error.message);
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <Link to={"/books"} className="" style={{ marginBlock: "1rem" }}>
        🔙 Back
      </Link>

      {/* <button
        type="button"
        onClick={() => setShowModal(true)}
        className="delete"
      >
        Delete book
      </button> */}

      <dialog open={showModal}>
        <form method="#">
          <p>Are you sure you want to delete this book?</p>
          <button className="deletebtn" onClick={handleDeleteBook}>
            {isDeleting ? "Deleting..." : "  ❌ Delete"}
          </button>
        </form>
      </dialog>

      {data &&
        data.map((book) => {
          return (
            <>
              <div key={book._id} className="bookdetails">
                <div className="col-2">
                  <img
                    src={`https://mern-book-app-iota.vercel.app/uploads/${book.thumbnail}`}
                    alt={book.title}
                  />
                  <br />

                  <Link to={`/editbook/${book.slug}`}>✏️ Edit Book</Link>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(true);
                      setBookId(book._id);
                    }}
                    style={{ marginInlineStart: "1rem" }}
                    className="delete"
                  >
                    Delete book
                  </button>
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
            </>
          );
        })}
    </div>
  );
}

export default SingleBook;
