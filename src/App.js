import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./admin/login";
import CommentPro from "./commentPro/commentPro";
import CommentProduct from "./commentProduct/commentProduct";
import Home from "./admin/home/home"
import ClientDetails from "./admin/home/client/clientDetails";
import ProfessionalDetails from "./admin/home/professionnel/ProfessionnelDetails";
import ProduitDetails from "./admin/home/produit/produitDetails";
import WaitingDetails from "./admin/home/waiting/waitingDetails";
import AddProduct from "./admin/home/produit/addProduct";


function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/loginAdmin" element={<Login />} />
            <Route path="/commentPro/:id" element={<CommentPro />} />
            <Route path="/commentProduct/:id" element={<CommentProduct />} />
              <Route path="/home/:id" element={<Home />} />
              <Route path="/clients/:id" element={<ClientDetails />} />
              <Route path="/professionnels/:id" element={<ProfessionalDetails />} />
              <Route path="/produits/:id" element={<ProduitDetails />} />
              <Route path="/waiting/:id" element={<WaitingDetails />} />
              <Route path="/addProduct" element={<AddProduct />} />
          </Routes>
        </div>
      </Router>
  );
}


export default App;
