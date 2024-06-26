// import React from "react";
// import Drawer from "@material-ui/core/Drawer";
// import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
// import { makeStyles, Theme } from "@material-ui/core/styles";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import MailIcon from "@material-ui/icons/Mail";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import DashboardIcon from "@material-ui/icons/Dashboard";
// import DevicesIcon from "@material-ui/icons/Devices";
// import EventIcon from "@material-ui/icons/Event";
// import ExploreIcon from "@material-ui/icons/Explore";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import SettingsIcon from "@material-ui/icons/Settings";

// const drawerWidth = 240;

// const useStyles = makeStyles((theme: Theme) => ({
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0
//   },
//   drawerPaper: {
//     width: drawerWidth
//   },
//   drawerHeader: {
//     display: "flex",
//     alignItems: "center",
//     padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar,
//     justifyContent: "flex-end"
//   }
// }));

// interface DrawerProps {
//   open: boolean;
//   handleDrawerClose: () => void;
// }

// const SidebarDrawer: React.FC<DrawerProps> = ({ open, handleDrawerClose }) => {
//   const classes = useStyles();

//   return (
//     <Drawer
//       className={classes.drawer}
//       variant="persistent"
//       anchor="left"
//       open={open}
//       classes={{
//         paper: classes.drawerPaper
//       }}
//     >
//       <div className={classes.drawerHeader}>
//         <IconButton onClick={handleDrawerClose}>
//           <ChevronLeftIcon />
//         </IconButton>
//       </div>
//       <Divider />
//       <div className="">
//         <List>
//           <ListItem button>
//             <ListItemIcon>
//               <DashboardIcon />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItem>
//           <ListItem button>
//             <ListItemIcon>
//               <MailIcon />
//             </ListItemIcon>
//             <ListItemText primary="Mail" />
//           </ListItem>

//           <ListItem button>
//             <ListItemIcon>
//               <EventIcon />
//             </ListItemIcon>
//             <ListItemText primary="Events" />
//           </ListItem>
//           <ListItem button>
//             <ListItemIcon>
//               <ExploreIcon />
//             </ListItemIcon>
//             <ListItemText primary="Explore" />
//           </ListItem>
//           <ListItem button>
//             <ListItemIcon>
//               <FavoriteIcon />
//             </ListItemIcon>
//             <ListItemText primary="Favorites" />
//           </ListItem>
//         </List>
//         <Divider />
//         <List>
//           <ListItem button>
//             <ListItemIcon>
//               <DevicesIcon />
//             </ListItemIcon>
//             <ListItemText primary="Devices" />
//           </ListItem>
//           <ListItem button>
//             <ListItemIcon>
//               <SettingsIcon />
//             </ListItemIcon>
//             <ListItemText primary="Settings" />
//           </ListItem>
//         </List>
//       </div>
//     </Drawer>
//   );
// };

// export default SidebarDrawer;


import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator"; // Import drag icon

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
}));

interface DrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  handleDrag:(graphType:string)=>void;
}

const SidebarDrawer: React.FC<DrawerProps> = ({ open, handleDrawerClose, handleDrag }) => {
  const classes = useStyles();

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, chartType: string) => {
    handleDrag && handleDrag(chartType);
    event.dataTransfer.setData("chartType", chartType); // Set data to identify the type of chart being dragged
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <div className="">
        <List>
          <ListItem button draggable onDragStart={(e) => handleDragStart(e, "bar")}> {/* Add draggable attribute and drag event handler */}
            <ListItemIcon>
              <DragIndicatorIcon /> {/* Drag icon */}
            </ListItemIcon>
            <ListItemText primary="Bar Chart" />
          </ListItem>
          <ListItem button draggable onDragStart={(e) => handleDragStart(e, "line")}> {/* Add draggable attribute and drag event handler */}
            <ListItemIcon>
              <DragIndicatorIcon /> {/* Drag icon */}
            </ListItemIcon>
            <ListItemText primary="Line Chart" />
          </ListItem>
          <ListItem button draggable onDragStart={(e) => handleDragStart(e, "scatter")}> {/* Add draggable attribute and drag event handler */}
            <ListItemIcon>
              <DragIndicatorIcon /> {/* Drag icon */}
            </ListItemIcon>
            <ListItemText primary="Scatter Chart" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default SidebarDrawer;
