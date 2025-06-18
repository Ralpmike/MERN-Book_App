import { useEffect, useRef, useState } from "react";
import NoImageSelected from "../../assets/no-image-selected.jpeg";
import { useNavigate, useParams } from "react-router";

function CreateBook() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    thumbnail: null,
    stars: null,
    description: "",
    category: "",
  });
  const [imagePreview, setImagePreview] = useState(NoImageSelected);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const method = slug ? "PUT" : "POST";
  const endpoint = slug
    ? `http://localhost:8000/api/books/${slug}`
    : "http://localhost:8000/api/books";

  console.log(slug);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8000/api/books/${slug}`);
        const data = await response.json();
        console.log("data", data);
        data.book.map((item) => {
          setFormData({
            title: item.title,
            slug: item.slug,
            thumbnail: item.thumbnail,
            stars: item.stars,
            description: item.description,
            category: item.category.join(", "),
          });
          if (item.thumbnail)
            setImagePreview(`http://localhost:8000/uploads/${item.thumbnail}`);
        });
      } catch (error) {
        setMessage(error.message);
      }
    }
    fetchData();
  }, [slug]);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
      }));
      setImagePreview(file ? URL.createObjectURL(file) : NoImageSelected);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "stars" ? parseInt(value, 10) || null : value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    console.log(JSON.stringify(formData));
    e.preventDefault();
    const { title, slug, thumbnail, stars, description, category } = formData;

    //?validation
    if (!title || !slug || !thumbnail || !stars || !description || !category) {
      setMessage("All fields are required");
      return;
    }

    if (stars < 1 || stars > 5) {
      setMessage("Stars must be between 1 and 5");
      return;
    }

    setIsLoading(true);
    const formsData = new FormData();

    formsData.append("title", formData.title);
    formsData.append("slug", formData.slug);
    formsData.append("stars", formData.stars);
    formsData.append("description", formData.description);
    // formsData.append("category", formData.category);
    category.split(",").forEach((c) => formsData.append("category", c.trim()));
    if (thumbnail) {
      formsData.append("thumbnail", thumbnail);
    }

    console.log(formsData.getAll("category"));

    try {
      // const { title, slug } = formData;
      console.log(formData);
      const response = await fetch(endpoint, {
        method: method,
        body: formsData,
      });
      if (response.ok) {
        setFormData({
          title: "",
          slug: "",
          stars: null,
          description: "",
          category: "",
          thumbnail: null,
        });
        setImagePreview(NoImageSelected);
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        setMessage("Book created successfully");
        setIsLoading(false);
        navigate("/books");
      } else {
        console.log("Error creating book");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Book</h1>
      <p>
        This is where we use Nodejs, Express & MongoDB to grap some data. data
        below is pulled from Mongo database
      </p>
      {message && (
        <div
          style={{
            color: (message.includes("success") ? "green" : "red") ?? "",
          }}
        >
          {message}
        </div>
      )}

      <form
        action=""
        onSubmit={handleFormSubmit}
        className="bookdetails"
        encType="multipart/form-data"
      >
        <div className="col-1">
          <div>
            <label htmlFor="">Upload Thumbnail</label>
            <img src={imagePreview} alt="Book thumnail preview" />
            <input
              ref={fileInputRef}
              type="file"
              name="thumbnail"
              accept="image/gif, image/jpeg, image/png, image/webp, image/jpg"
              onChange={handleFormChange}
            />
          </div>
        </div>

        <div className="col-2">
          <div>
            <label htmlFor="">Title</label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="">Slug</label>
            <input
              name="slug"
              type="text"
              value={formData.slug}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="">Description</label>
            <textarea
              name="description"
              rows={4}
              cols={50}
              value={formData.description}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="">Category (comma separated)</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="">Stars</label>
            <input
              type="number"
              name="stars"
              value={formData.stars ?? ""}
              onChange={handleFormChange}
              min={1}
              max={5}
            />
          </div>
          <input type="submit" value={isLoading ? "Adding..." : "Add Book"} />
        </div>
      </form>
    </div>
  );
}

export default CreateBook;
