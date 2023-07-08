import "./App.css";
import './index.css';

import { Route, Routes } from "react-router-dom";
import Books from "./Components/Books";
import BookDetail from "./Components/BookDetail";
import Login1 from "./Components/Login1";
import Users from "./Components/Users";
import Signup from "./Components/Signup";
import UserDetail from "./Components/UserDetail";
import Carts from "./Components/Cart";




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/carts/:username" element={<Carts />} />
        {/* <Route path="/books/search/:keyword" element={<LaptopsSearch />} /> */}
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/login" element={<Login1 />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </div>
  );
}

export default App;
