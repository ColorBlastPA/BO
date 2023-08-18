import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./admin/login";
import CommentPro from "./commentPro/commentPro";
import CommentProduct from "./commentProduct/commentProduct";
import Home from "./admin/home/home"


function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/loginAdmin" element={<Login />} />
            <Route path="/commentPro/:id" element={<CommentPro />} />
            <Route path="/commentProduct/:id" element={<CommentProduct />} />
              <Route path="/home/:id" element={<Home />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
