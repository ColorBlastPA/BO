import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./admin/login";
import CommentPro from "./commentPro/commentPro";
import CommentProduct from "./commentProduct/commentProduct";


function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/loginAdmin" element={<Login />} />
            <Route path="/commentPro" element={<CommentPro />} />
            <Route path="/commentProduct/:id" element={<CommentProduct />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
