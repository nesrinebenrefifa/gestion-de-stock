// import React from 'react'
import { Box, IconButton} from "@mui/material";
import InputBase from "@mui/material/InputBase";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
// import Home from "./Home";



function Bar() {
  
      
        return (
            <div   > 
               
             
            <Box display="flex" justifyContent="space-between" p={3}>
              {/* SEARCH BAR */}
              <Box
                display="flex"
             left="150Px"
                borderRadius="3px"
              >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                  <SearchIcon />
                </IconButton>
              </Box>
        
              {/* ICONS */}
              <Box display="flex">
                
                
                <IconButton>
                  <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                  <SettingsOutlinedIcon />
                </IconButton>
                <IconButton>
                  <PersonOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
            </div>
          
          );
        }





export default Bar
