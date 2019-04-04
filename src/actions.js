export const ACTION_TYPES = {
  GET_POST: 'GET-POST',
  GO_NEXT: 'GO-NEXT',
  GO_BACK: 'GO-BACK',
  GO_RANDOM: 'GO-RANDOM',
  SET_POST: 'SET-POST'
};

export const getPost = (id) => ({
  type: ACTION_TYPES.GET_POST,
  id
});

export const setPost = ({num, link, img, title}) => ({
  type: ACTION_TYPES.SET_POST,
  payload: {
    num, link, img, title
  }
});

export const goNext = () => ({
  type: ACTION_TYPES.GO_NEXT 
});

export const goBack = () => ({
  type: ACTION_TYPES.GO_BACK
});

export const goRandom = () => ({
  type: ACTION_TYPES.GO_RANDOM 
});