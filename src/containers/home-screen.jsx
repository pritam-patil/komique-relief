import React from 'react';
import { connect } from 'react-redux';
import { LinearProgress, SvgIcon } from '@material-ui/core';
import {
  getApiURL,
  getHumanReadableTime,
  getRandomPostID
} from '../utils';
import { goBack, goNext, goRandom, setPost } from "../actions";
import AppBar from '../components/app-bar';
import Card from '../components/card-item';

const withSVG = props => (
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <img src={props.source} style={{marginTop: '10%'}} alt='loading-svg' width={300} height={250}/>
  </div>
);

const LoadingSVG = () => (
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <img src='/undraw_loading_frh4.svg' style={{marginTop: '10%'}} alt='loading-svg' width={300} height={250}/>
  </div>
);

const OfflineSVG = () => (
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <img src='http://komique-relief.surge.sh/offline.svg' style={{marginTop: '15%'}} alt='offline-svg' width={300} height={250}/>
  </div>
);


class ReactHome extends React.Component {
  constructor(props) {
    super(props);
  
  this.state = {
    comicIndex: getRandomPostID(),
    post: {},
    isLoading: true,
    offline: !window.navigator.onLine
    }
  }

  fetchAndSetState = index => {
    fetch(getApiURL(index))
      .then(response => response.json())
      .then(data => this.setState({post: data, isLoading: false}));
  }

  handleOfflineCard = () => {
    this.setState({ offline: true})
  }

  componentWillMount() {
    window.addEventListener('offline', this.handleOfflineCard);
  }
  
  componentDidMount() {
    this.fetchAndSetState(this.state.comicIndex);
  }

  onRandomClick = () => {
    this.setState({isLoading: true});
    const random = Math.floor(Math.random() * 10000) % 2050;
    fetch(getApiURL(random))
      .then(response => response.json())
      .then(data => this.setState({comicIndex: random, post: data, isLoading: false}));
  }

  onBackClick = () => {
    const newIndex = this.state.comicIndex - 1;
    fetch(getApiURL(newIndex))
      .then(response => response.json())
      .then(data => this.setState({comicIndex: newIndex, post: data, isLoading: false}));
  }
  
  onNextClick = () => {
    const newIndex = this.state.comicIndex + 1;
    fetch(getApiURL(newIndex))
      .then(response => response.json())
      .then(data => this.setState({comicIndex: newIndex, post: data, isLoading: false}));
  }

  render() {
    const { post: {title, img, day, month, year}, isLoading } = this.state;
    return (
      <div>
        <AppBar
          onClick={this.onRandomClick}
          onBackClick={this.onBackClick}
          onNextClick={this.onNextClick}
          isLoading={isLoading}
        />

        {!window.navigator.onLine && (
          <OfflineSVG/>
        )}
        {
          isLoading && window.navigator.onLine &&
             <LoadingSVG />
        }
        {!isLoading && window.navigator.onLine && (
            <Card
              title={title}
              image={img}
              time={getHumanReadableTime(day, month, year)}
            />
          )
        }
      </div>
    );
  }
}


class Home extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.currentIndex !== nextProps.currentIndex) {
      // const response = fetchDetails(nextProps.currentIndex);
      // console.log(">>");
      // console.log(response);
      
      // this.props.setPostDetails(response);
    }
  }

  render() {
    const { imgURL, onBackClick, onNextClick, onRandomClick } = this.props;
    return (
        <div>
          <AppBar
            onClick={onRandomClick}
            onBackClick={onBackClick}
            onNextClick={onNextClick}
          />
          <Card
            title={'6/6 Times'}
            image={imgURL || 'https://imgs.xkcd.com/comics/drapes.png'}
            time={'Sept 6, 2017'}
          />
        </div>
      );
  }
}

const mapStateToProps = state => ({
  currentIndex: state.currentIndex,
  postIDs: state.postIDs,
  posts: state.posts
});

const mapDispatchToProps = dispatch => ({
  onRandomClick: () => dispatch(goRandom()),
  onBackClick: () => dispatch(goBack()),
  onNextClick: () => dispatch(goNext()),
  setPostDetails: ({ num, link, title, img }) => dispatch(setPost({num, link, title, img})),
  dispatch
})

const withRedux = connect(mapStateToProps, mapDispatchToProps) (Home);

export default ReactHome;

/* SVG tile from undraw.co :

<div style={{marginTop: '20%'}}>
              <svg 
                id="148311d9-c125-4449-a148-b8fa33f3c561" 
                data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                width="400"
                height="400"
                viewBox="0 0 400 400"
              >
                <defs>
                  <linearGradient
                    id="fe24b365-19a0-4a71-abdc-76e4b2fc8dee"
                    x1="313.72"
                    y1="759"
                    x2="313.72"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0"
                      stop-color="gray"
                      stop-opacity="0.25"
                    />
                    <stop
                      offset="0.54"
                      stop-color="gray"
                      stop-opacity="0.12"
                      /><stop offset="1" stop-color="gray" stop-opacity="0.1"/></linearGradient><linearGradient id="f1e26e3d-9d52-4866-b24c-036458e443cc" x1="313.72" y1="455.23" x2="313.72" y2="213.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#b3b3b3" stop-opacity="0.25"/><stop offset="0.54" stop-color="#b3b3b3" stop-opacity="0.1"/><stop offset="1" stop-color="#b3b3b3" stop-opacity="0.05"/></linearGradient></defs><title>blog</title><rect width="400" height="400" fill="url(#fe24b365-19a0-4a71-abdc-76e4b2fc8dee)"/><rect x="7.58" y="5.49" width="400" height="400" fill="#fff"/><rect x="50.71" y="52.74" width="240.74" height="19.72" fill="#6170C2"/><rect x="50.71" y="513.37" width="240.74" height="19.72" fill="#64ffda"/><rect x="50.71" y="92.18" width="526.03" height="19.72" fill="#e0e0e0"/><rect x="50.71" y="131.63" width="526.03" height="19.72" fill="#e0e0e0"/><rect x="46.44" y="213.09" width="534.56" height="242.14" fill="url(#f1e26e3d-9d52-4866-b24c-036458e443cc)"/><rect x="51.18" y="216.78" width="526.03" height="231.2" fill="#6170c2"/><rect x="50.71" y="637.59" width="526.03" height="19.72" fill="#e0e0e0"/><rect x="50.71" y="678.34" width="526.03" height="19.72" fill="#e0e0e0"/><rect x="50.71" y="597.05" width="526.03" height="19.72" fill="#e0e0e0"/><rect x="50.71" y="556.51" width="526.03" height="19.72" fill="#e0e0e0"/></svg>
                      </div>

                      */
