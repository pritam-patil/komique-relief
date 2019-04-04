import { createStore } from 'redux';
import { ACTION_TYPES } from './actions';
import fetchDetails from './transport';

const { GET_POST, GO_BACK, GO_NEXT, GO_RANDOM, SET_POST } = ACTION_TYPES;

const defaultState = {
  currentIndex: 0,
  postIDs: [],
  posts: {}
}

const rootReducer = (state=defaultState, action) => {
  switch (action.type) {
    case GO_BACK:
      return Object.assign({},
        state,
        {currentIndex: state.currentIndex - 1}
      );

    case GO_NEXT:
      return Object.assign({},
        state,
        {currentIndex: state.currentIndex + 1}
      );

    case GO_RANDOM:
      const index = Math.floor(Math.random() * 10000) % 2050;
      const response = fetchDetails(index);
      console.log(response);
      return Object.assign({},
        state,
        {
          currentIndex: index
        }
      );

    case SET_POST:
        const { num, link, img, title } = action.payload;
        const post = {num: { link, img, title }};
        return Object.assign({},
          state,
          {
            postIDs: state.postIDs.concat(num),
            posts: {...state.posts, post}
          }
        );
  
    default:
        return defaultState;
  }
}

const store = createStore(
  rootReducer, 
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;