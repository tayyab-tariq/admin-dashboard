import { Box, useMediaQuery } from "@mui/material"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Navbar from "@/scenes/components/Navbar";
import Sidebar from "@/scenes/components/Sidebar";
import { useGetUserQuery } from "@/state/api";


const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);

  return (
    <Box display={isSidebarOpen ? "flex" : "block"} width='100%' height='100%'>
      <Sidebar 
        user={data || {}} 
        isNonMobile={isNonMobile}
        drawerWidth='250px'
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>                      {/* flexGrow creates space between left & right side of navbar when sidebar is open */}
        <Navbar user={data || {}} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
        <Outlet />                          {/* This represents everything underneath Navbar */}
      </Box>
    </Box>
  );
};

export default Layout