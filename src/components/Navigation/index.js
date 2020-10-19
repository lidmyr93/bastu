import React, { useState } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import SignOut from "../SignOut";
import { AuthUserContext } from "../Session";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Menu,
  MenuOpen,
  Schedule,
  KeyboardTab,
  AccountCircle,
  Autorenew,
  CalendarToday,
  Security,
  KeyboardReturn
} from "@material-ui/icons";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    position: "relative",
    zIndex: 1400,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  toggleContainer: {
    marginRight: "1rem",
  },
  paddingRight: {
    paddingRight: "8px",
  }
}));

const Navigation = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {open ? (
            <MenuOpen
              onClick={toggleDrawer(false)}
              className={classes.toggleContainer}
            />
          ) : (
            <Menu
              onClick={toggleDrawer(true)}
              className={classes.toggleContainer}
            />
          )}
          <Typography variant="h6">Bastu - Norra Oxhalsö</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={toggleDrawer(false)}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <AuthUserContext.Consumer>
            {(authUser) =>
              authUser ? (
                <NavigationAuth
                  authUser={authUser}
                  classes={classes}
                  open={open}
                  handleDrawerClose={handleDrawerClose}
                />
              ) : (
                <NavigationNonAuth
                  classes={classes}
                  open={open}
                  handleDrawerClose={handleDrawerClose}
                />
              )
            }
          </AuthUserContext.Consumer>
        </div>
      </Drawer>
    </div>
  );
};
const NavigationAuth = ({ authUser, classes, handleDrawerClose }) => (
  
  <>
    <List>
    <Link to={ROUTES.BOOKINGS} style={{textDecoration: "none"}}>
      <ListItem button onClick={handleDrawerClose}>
        <ListItemIcon className={classes.paddingRight}>
          <Schedule />
        </ListItemIcon>
        <ListItemText>
          Boka tid
        </ListItemText>
      </ListItem>
      </Link>
      <Link to={ROUTES.MY_BOOKINGS} style={{textDecoration: "none"}}>
      <ListItem button onClick={handleDrawerClose}>
        <ListItemIcon className={classes.paddingRight}>
          <CalendarToday />
        </ListItemIcon>
        <ListItemText>
          Mina Tider
        </ListItemText>
      </ListItem>
      </Link>

      <Link to={ROUTES.ACCOUNT} style={{textDecoration: "none"}}>
      <ListItem button onClick={handleDrawerClose}>
        <ListItemIcon className={classes.paddingRight}>
          <AccountCircle />
        </ListItemIcon>
        <ListItemText>
          Konto
        </ListItemText>
      </ListItem>
      </Link>

      {!!authUser.roles[ROLES.ADMIN] && (
        <>
          <Divider />
          <Link to={ROUTES.ADMIN} style={{textDecoration: "none"}}>
          <ListItem button onClick={handleDrawerClose}>
            <ListItemIcon className={classes.paddingRight}>
              <Security />
            </ListItemIcon>
            <ListItemText>
              Admin
            </ListItemText>
          </ListItem>
          </Link>
        </>
      )}

      <Divider />
      <ListItem button onClick={handleDrawerClose}>
        <ListItemIcon><KeyboardReturn /></ListItemIcon>
        <ListItemText>
          <SignOut />
        </ListItemText>
      </ListItem>
    </List>
  </>
);

const NavigationNonAuth = ({ handleDrawerClose, classes }) => (
  <List>
    <Link to={ROUTES.SIGN_IN} style={{textDecoration: "none"}}>
    <ListItem button onClick={handleDrawerClose}>
      <ListItemIcon className={classes.paddingRight}>
        <KeyboardTab />
      </ListItemIcon>
      <ListItemText>
        Logga in
      </ListItemText>
    </ListItem>
    </Link>
    <Link to={ROUTES.PASSWORD_FORGET} style={{textDecoration: "none"}}>
    <ListItem button onClick={handleDrawerClose}>
      <ListItemIcon className={classes.paddingRight}>
        <Autorenew />
      </ListItemIcon>
      <ListItemText>
        Glömt lösenord
      </ListItemText>
    </ListItem>
    </Link>
  </List>
);

export default Navigation;
