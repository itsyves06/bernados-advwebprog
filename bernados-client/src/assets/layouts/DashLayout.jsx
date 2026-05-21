import * as React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";

// 1. Import an icon for your new Articles section
import ArticleIcon from "@mui/icons-material/Article"; 

const drawerWidth = 260;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "rgba(246, 240, 215, 0.9)",
  backdropFilter: "blur(10px)",
  color: "#7D8F69",
  boxShadow: "none",
  borderBottom: "2px solid #C1D8A4",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    backgroundColor: "#7D8F69",
    color: "#F6F0D7",
    borderRight: "none",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(9),
    }),
  },
}));

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // 2. Added Articles route item to your menu mapping registry array
  const menuItems = [
    { label: "Dashboard", to: "/dashboard", icon: <DashboardIcon /> },
    { label: "Reports", to: "/dashboard/reports", icon: <BarChartIcon /> },
    { label: "Users", to: "/dashboard/users", icon: <PeopleIcon /> },
    { label: "Articles", to: "/dashboard/articles", icon: <ArticleIcon /> }, 
  ];

  // 3. Optional helper to make the Top App Bar Title say what page you are on dynamically!
  const getCurrentTitle = () => {
    const currentItem = menuItems.find(item => item.to === location.pathname);
    return currentItem ? currentItem.label.toUpperCase() : "DASHBOARD";
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F6F0D7", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            onClick={() => setOpen(true)}
            sx={{ color: "#7D8F69", mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            {getCurrentTitle()}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: "#7D8F69",
              borderRadius: "12px",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#98AF81" },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <DrawerStyled variant="permanent" open={open}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", px: 1, height: 64 }}>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "#F6F0D7" }}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>
        <Divider sx={{ backgroundColor: "rgba(246, 240, 215, 0.1)" }} />
        <List sx={{ px: 1.5, mt: 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.to} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                to={item.to}
                selected={location.pathname === item.to}
                sx={{
                  borderRadius: "12px",
                  "&.Mui-selected": { backgroundColor: "#C1D8A4", color: "#4A5D3F" },
                  "&.Mui-selected .MuiListItemIcon-root": { color: "#4A5D3F" },
                  "&:hover": { backgroundColor: "rgba(193, 216, 164, 0.2)" },
                }}
              >
                <ListItemIcon sx={{ color: "#F6F0D7", minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemButton text="..." sx={{ display: "none" }} /> {/* Silent node item anchor */}
                <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DrawerStyled>
      <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;