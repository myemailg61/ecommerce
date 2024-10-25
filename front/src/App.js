import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './components/pages/Root';
import HomePage from './components/pages/HomePage'
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import Login from './components/signup/Login';
import CategoryProducts from './components/pages/CategoryProducts';
import SubCategoryProduct from './components/pages/SubCategoryProduct';
import Cart from './components/pages/Cart';

import Product from './pages/Admin/Product';
import ProductsList from './pages/Admin/ProductsList';
import Products2 from './pages/Admin/Products2';
import ProductDetails from './components/pages/ProductDetails';
import ProdEdit from './pages/Admin/ProdEdit';

import Dashboard from './pages/Admin/Dashboard';

const router = createBrowserRouter([{
  path: '/',
  element: <Root></Root>,

  children: [
    { path: "/", element: <HomePage></HomePage> },
    { path: "/about", element: <AboutPage></AboutPage> },
    { path: "/login", element: <Login></Login> },
    { path: "/product", element: <Product></Product> },
    { path: "/contact", element: <ContactPage></ContactPage> },
    { path: "/categoryProduct", element: <CategoryProducts></CategoryProducts> },
    { path: "/subCategoryProduct", element: <SubCategoryProduct></SubCategoryProduct> },
    { path: "/details/:id", element: <ProductDetails></ProductDetails> },
    { path: "/cart", element: <Cart></Cart> },


    { path: "/adminDashboard", element: <Dashboard></Dashboard> },
    { path: "/adminProductsList", element: <ProductsList></ProductsList> },
    { path: "/Products22", element: <Products2></Products2> },
    { path: "/productEdit/:id", element: <ProdEdit></ProdEdit> },
  ]
}])

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App;