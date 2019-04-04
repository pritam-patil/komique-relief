import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
	IconButton,
	Snackbar,
	Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { OFFLINE_SNACK_MESSAGE, ONLINE_SNACK_MESSAGE } from '../constants';

const styles = ({
  snackbarContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  success: {
    backgroundColor: 'green',
  },
  retry: {
	color: '#f50057',
	fontWeight: 'bold'
  }
});

class OnlineStateWrapper extends React.Component {
  constructor(props) {
    super(props);
  
  this.state = {
    online: window.navigator.onLine,
    showSnack: !window.navigator.onLine
    }
  }

  onSnackbarClose = () => {
    this.setState({ online: false, showSnack: false })
  }

  handleOffline = () => {
    this.setState({online: false, showSnack: true });
  }

  handleBackOnline = () => {
    const { online, showSnack } = this.state;
    if (!online && showSnack) {
      this.setState({ online: true, showSnack: true});
    }
    window.setTimeout(() => window.location.reload(), 3000);
  }
  
  componentDidMount() {

    window.addEventListener('offline', this.handleOffline);
    window.addEventListener('online', this.handleBackOnline);
  }

  componentWillUnmount() {
    window.clearTimeout();
  }

  render() {
    const { online, showSnack } = this.state;
    return (
      <div>
      {showSnack &&
        <OnlineStateContent 
          online={online}
          onClose={this.onSnackbarClose}
        />}
      </div>
    );
  }
}

const OnlineState = ({classes, online, onClose }) => (
  <div>
    <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className={classes.snackbar}
        open={!online}
        onClose={() => { /* onClose*/}}
        ContentProps={{
          'aria-describedby': 'snackbar-fab-message-id',
          'className': classes.snackbarContent
        }}
        message={<span id="snackbar-fab-message-id"> {OFFLINE_SNACK_MESSAGE} </span>}
        action={[
          <IconButton
              key="close"
              aria-label="Close"
              color="secondary"
              className={classes.close}
              onClick={() => window.location.reload()}
            >
				<Typography className={classes.retry}> RETRY </Typography>
            </IconButton>,
        ]}
      />
       <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={online}
          onClose={onClose}
          autoHideDuration={4000}
          ContentProps={{
            'aria-describedby': 'message-id',
            'className': classNames(classes.success, classes.snackbarContent)
          }}
          message={<span id="message-id">{ONLINE_SNACK_MESSAGE}</span>}
          action={null}
        />
  </div>
);

const OnlineStateContent = withStyles(styles) (OnlineState);
export default OnlineStateWrapper;
