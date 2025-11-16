import Navbar from "./components/Navbar"

import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"






import { Routes, Route, Navigate} from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"

import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"



function App() {

   const {authUser, checkAuth, isCheckingAuth}  = useAuthStore()

    useEffect(() => {

      checkAuth();


    }, [checkAuth]);

    console.log({authUser})

    //this checkAuth is giving error rn because authentication is not done, in sign up we will add this



    //right now we will add a loading screen, if ischeckingAuth is true and no auth user it will show 
    if(isCheckingAuth && !authUser) return(
      <div className="flex items-center justify-center h-screen">

      <Loader className="size-10 animate-spin" />

      </div>
    )



  return (
    <>
      <div>


        <Navbar />


        <Routes>
          {/* if auth user is true then user can see the homepage else will be navigated to login page */}

          {/* for login and signup pages if user is logged in we dont want to show those pages so if !authUser then they can see otherwise will be directed to homepage */}
          <Route path="/" element={authUser ? <HomePage />: <Navigate to="/login" /> }/>
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to = "/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to = "/" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={ authUser ? <ProfilePage/> : <Navigate to="/login" />} />

        </Routes>

        <Toaster />

      </div>
    </>
  )
}

export default App
