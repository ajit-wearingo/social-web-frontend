import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import NavBar from '../Components/Navbar/Navbar'
import Dashboard from '../Pages/Admin/Dashboard'
import MyPosts from '../Pages/Admin/MyPosts'
import Profile from '../Pages/Admin/Profile'
import SinglePost from "../Pages/Admin/SinglePost"
const Admin = () => {
    return (
        <>
            <NavBar />
            <div style={{paddingTop : "120px"}}>
            <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/myPosts/:userId" element={<MyPosts />} />
                    <Route path="/singlePost/:postId" element={<SinglePost />} />
                    <Route path="/profile/:userid" element={<Profile />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
            </div>
        </>
    )
}

export default Admin
