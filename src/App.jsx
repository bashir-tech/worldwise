/* eslint-disable no-unused-vars */
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill"
import { Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import City from "./components/City"
import CityList from "./components/CityList"
import CountyLis from "./components/CountryList"
import Form from "./components/Form"
import SpinnerFullPage from "./components/SpinnerFullPage"
import { AuthProvider } from "./contexts/AuthProvider"
import { CitiesProvider } from "./contexts/CitiesProvider"
// import AppLayout from "./pages/AppLayout"
// import Homepage from "./pages/Homepage"
// import Login from "./pages/Login"
// import Pricing from "./pages/Pricing"
// import Product from "./pages/Product"
// import ProtectedRoute from "./pages/ProtectedRoute"

const AppLayout = lazy(() => import("./pages/AppLayout"))
const Homepage = lazy(() => import("./pages/Homepage"))
const Login = lazy(() => import("./pages/Login"))
const Pricing = lazy(() => import("./pages/Pricing"))
const Product = lazy(() => import("./pages/Product"))
const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"))


polyfillCountryFlagEmojis();
function App() {
 

  return (
  
      <AuthProvider>

    
      <CitiesProvider>
        


        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage/>}>
         
        <Routes>
          <Route path="/" element={<Homepage/>} />
          
          <Route path="product" element={<Product />} />
          
          <Route path="pricing" element={<Pricing />} />

          <Route path="login" element={<Login />} />
          
            <Route path="app" element={<ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>} >
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />}/>
            <Route path="Countries"  element={<CountyLis />}/>
            <Route path="form"  element={<Form />}/>
            <Route index element={<Navigate replace to="cities"/>}/>
          
          </Route>
          
            </Routes>
               
          </Suspense>
      </BrowserRouter>
        </CitiesProvider>
        </AuthProvider>
   
  )
}

export default App
