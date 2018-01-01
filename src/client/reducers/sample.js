import axios from 'axios';

const sampleData1 = '@sample/data1';

const initialState = {
  data1: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case sampleData1:
      return { ...state, data1: action.data }
    default:
      return state  
  }
}

// Action creators
function loadData(data) {
  return {
    type: sampleData1,
    data
  }
}

export function fetchApiData() {
  return function (dispatch) {
    return axios.get(`https://api.tvmaze.com/search/shows?q=batman`)
      .then(res => {
        return dispatch(loadData(res.data))
      })
      .catch(err => console.log(err))
  }
}