import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./routes/Home/home";
import About from "./routes/About/about";
import Header from "./components/header";
import Footer from "./components/footer";
import Books from "./routes/Books/book";
import SingleBook from "./routes/Books/singleBook";
import CreateBook from "./routes/Books/createBook";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="books/:slug" element={<SingleBook />} />
        <Route path="/createbook" element={<CreateBook />} />
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
