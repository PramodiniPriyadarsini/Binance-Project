import React from "react";

// Store Context is the global context that is managed by reducers.

const Store = React.createContext({
  releases: [
    {
      checked: false,
      text: "TROY Project"
    },
    {
      checked: false,
      text: "Kava Project"
    },
    {
      checked: true,
      text: "Brand Protocol Project"
    },
    {
      checked: true,
      text: "PERLIN Project"
    } ,
    {
      checked: true,
      text: "Harmony Project"
    }  
    ]
});

export default Store;
