export default function reducer(state, action) {
    switch (action.type) {
      case "ADD_TODO": 
        if (!action.payload) {
          return state;
        } 
        let text = action.payload;  
        return {
          ...state,
          releases: [...state.releases, {text, checked: false}]
        };
      case "COMPLETE": 
        return {
          ...state,
          releases: state.releases.map((release, index) => {
            if (action.payload === index) {
                release.checked = !release.checked;
            } 
            return release;
          })
        };
      case "DELETE":
        return {
          ...state,
          releases: state.releases.filter((release, index) => action.payload !== index)
        };
      default:
        return state;
    }
  }
  