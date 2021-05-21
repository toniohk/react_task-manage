import React from 'react';
import { withCookies } from 'react-cookie';
import { Route, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';

import routes from '../../../routes';
import { useUserContext } from '../../../context/UserContext';

const drawerWidth = 240;

const StyledIconButton = withStyles({
  root: {
    '&:focus': {
      outline: 'none'
    },
  },
})(IconButton);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  logOutButton: {
    color: 'white'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
}));

function Main(props) {
  const { cookies, history } = props;
  const { userInfo } = useUserContext();

  const getRoutes = () => {
    return routes.map((prop, key) => {
      if (prop.layout === '/') {
        if (prop.role === 0 && userInfo.role !== 0) return null;

        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            {...prop}
          />
        );
      } else {
        return null;
      }
    });
  };

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logOut = () => {
    cookies.remove('userInfo');
    history.push('/auth');
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button onClick={() => props.history.push('/')}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>
        <ListItem button onClick={() => props.history.push('/projects')}>
          <ListItemIcon><BusinessIcon /></ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
        {userInfo.role === 0 && (
          <ListItem button onClick={() => props.history.push('/users')}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        )}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <StyledIconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </StyledIconButton>
          <Typography variant="h6" noWrap>
            Task Manage
          </Typography>
          <div className="absolute right-10">
            <StyledIconButton
              onClick={() => logOut()}
              className={classes.logOutButton}
            >
              <ExitToAppIcon />
            </StyledIconButton>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>{getRoutes()}</Switch>
      </main>
    </div>
  );
}

export default withCookies(Main);
