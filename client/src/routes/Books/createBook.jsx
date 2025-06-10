import { useState } from "react";
import NoImageSelected from "../../assets/no-image-selected.jpeg";

function CreateBook() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    thumbnail: null,
    stars: "",
    description: "",
    category: "",
  });
  const [imagePreview, setImagePreview] = useState(NoImageSelected);
  const [message, setMessage] = useState("");

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
        [name]: value,
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

    const formsData = new FormData(e.target);

    // formsData.append("title", formData.title);
    // formsData.append("slug", formData.slug);
    // formsData.append("stars", formData.stars);
    // formsData.append("description", formData.description);
    // // formsData.append("category", formData.category);
    // category.split(",").map((c) => formsData.append("category", c.trim()));
    // if (thumbnail) {
    //   formsData.append("thumbnail", thumbnail);
    // }

    console.log(formsData.getAll("category"));

    try {
      // const { title, slug } = formData;
      console.log(formData);
      const response = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        body: formsData,
      });
      if (response.ok) {
        setFormData({
          title: "",
          slug: "",
          stars: "",
          description: "",
          category: "",
          thumbnail: null,
        });
      } else {
        console.log("Error creating book");
      }
    } catch (error) {
      console.log(error);
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
        <div style={{ color: message.includes("success") ? "green" : "red" }}>
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
            <input
              name="description"
              type="text"
              value={formData.description}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="">Category</label>
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
              type="text"
              name="stars"
              value={formData.stars}
              onChange={handleFormChange}
            />
          </div>
          <input type="submit" value={"Add Book"} />
        </div>
      </form>
    </div>
  );
}

export default CreateBook;
