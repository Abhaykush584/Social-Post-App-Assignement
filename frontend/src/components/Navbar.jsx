import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";

const Navbar = () => {
 const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/auth";
};


  return (
    <AppBar position="static">
      <Toolbar>
        <h3 style={{ flexGrow: 1 }}>TaskPlanet Social</h3>
        <Button color="inherit" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
