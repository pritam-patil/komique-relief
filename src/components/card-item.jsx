import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CssBaseline,
  IconButton
} from '@material-ui/core';
import { 
  Favorite as FavoriteIcon,
  Share as ShareIcon
} from "@material-ui/icons";

const styles = theme => ({
  card: {
    borderRadius: 8,
    marginTop: '15%',
    marginLeft: '8px',
    marginRight: '8px'
  },
  cardHeader: {
    backgroundColor: 'hsl(218, 9%, 96%)',
    marginBottom: 16
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  cardTime: {
    fontSize: 14,
    color: 'hsl(214, 7%, 47%)'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    backgroundSize: 'contain',
  },
  avatar: {
    backgroundColor: '#6170C2',
  },
  actions: {
    backgroundColor: 'hsl(218, 9%, 96%)',
    margin: '16px',
    borderRadius: 8,
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

const ComicCard = props => {
  const { classes, title, image, time } = props;

  return (
    <div>
      <CssBaseline />
    
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            {!!title && title[0]}
          </Avatar>
        }
        className={classes.cardHeader}
        title={title}
        subheader={time}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={title}
      />
      <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
    </Card>
    </div>
  )
}

export default withStyles(styles) (ComicCard);