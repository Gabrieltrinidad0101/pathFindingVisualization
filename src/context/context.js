import React, { useState, useContext } from "react";

const AppContext = React.createContext()


export const AppProvider = ({ children }) => {
    const [gridOne, setGridOne] = useState([]);
    const [gridTwo, setGridTwo] = useState([]);

    const [config,setConfig] = useState({
      toggleWalls: true,
      isPath: false,
      isVisualizationTwo: false
    })
  return <AppContext.Provider value={{gridOne, setGridOne,
                                      gridTwo, setGridTwo,
                                      config,setConfig
                                      }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}