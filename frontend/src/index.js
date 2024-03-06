import React from "react"
import { Provider } from "react-redux"
import { HelmetProvider } from "react-helmet-async"
import store from "./store"
import ReactDOM from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "./assets/styles/bootstrap.custom.css"
import "./assets/styles/index.css"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import PrivateRoute from "./components/auth-guards/PrivateRoute"
import AdminRoute from "./components/auth-guards/PrivateRoute"
import HomeScreen from "./screens/HomeScreen"
import BookScreen from "./screens/BookScreen"
import FavoritesScreen from "./screens/FavoritesScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"
import BooksListScreen from "./screens/admin/BooksListScreen"
import BookEditScreen from "./screens/admin/BookEditScreen"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<HomeScreen />}
      />
      <Route path="/book/:id" element={<BookScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      {/* Private routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      {/* Admin Routes */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/booklist" element={<BooksListScreen />} />
        <Route
          path="/admin/booklist/page/:pageNumber"
          element={<BooksListScreen />}
        />
        <Route path="/admin/book/:id/edit" element={<BookEditScreen />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
)

reportWebVitals()
