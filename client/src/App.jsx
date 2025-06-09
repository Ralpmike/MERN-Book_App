import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./routes/Home/home";
import About from "./routes/About/about";
import Header from "./components/header";
import Footer from "./components/footer";
import Books from "./routes/Books/book";
import SingleBook from "./routes/Books/singleBook";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="books/:slug" element={<SingleBook />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
