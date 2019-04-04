import React from "react";
import { SHOW_ONLINE_STATE } from '../constants';
import { withStyles } from '@material-ui/core/styles';
import { 
  AppBar,
  CircularProgress,
  Fab,
  IconButton,
  Toolbar
} from '@material-ui/core';
import {
  /* Flare as AddIcon, */
  Whatshot as AddIcon,
  Menu as MenuIcon,
  MoreVert as MoreIcon,
  ChevronLeft as BackIcon,
  ChevronRight as NextIcon
} from '@material-ui/icons';
import OnlineState from './online-state-snack';

const styles = {
  root: {
    margin: '8px'
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    border: '4px solid white',
  },
  fabProgress: {
    color: '#214784',
    position: 'absolute',
    top: -34,
    left: 0,
    right: 0,
    margin: '0 auto',
    zIndex: 1,
  }
}

const MyAppBar = props => {
  const { classes } = props;

  return (
    <div>
    <AppBar
      position='fixed'
      color='primary'
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
          <div>
          <IconButton color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <IconButton
            onClick={props.onBackClick}
            color="inherit"
            aria-label="Last comic"
          >
            <BackIcon />
          </IconButton>
          </div>
          <Fab onClick={props.onClick} color="secondary" aria-label="Add" className={classes.fabButton}>
            <AddIcon onClick={() => { console.log(`>> addIcon clicked`) }} fontSize={'large'}/>
          </Fab>
          {props.isLoading && window.navigator.onLine && 
            <CircularProgress
              size={68}
              className={classes.fabProgress}
           />
          }
          <div>
            <IconButton
              onClick={props.onNextClick}
              color="inherit"
              fontSize={'large'}
            >
              <NextIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="More details">
            <MoreIcon />
          </IconButton>
          </div>
        </Toolbar>
    </AppBar>
    {
	SHOW_ONLINE_STATE && <OnlineState/>
    }
    </div>
  )
}

export default withStyles(styles) (MyAppBar);
