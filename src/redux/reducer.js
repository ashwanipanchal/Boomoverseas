const data = {
  userDetail: {},

  deviceInfo: {
    id: '',
    token: '',
    model: '',
    os: '',
  },
  language: '',
};
const reducer = (state = data, action) => {
  switch (action.type) {
    case 'setUserDetail':
      return {
        ...state,
        userDetail: action.payload,
        isLogin: true,
      };
    
    case 'language':
      return{...state, language: action.payload};
    default:
      return state;
  }
};
export default reducer;
