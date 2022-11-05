import React, {useState, createContext} from "react";

export const MapDataContext = createContext();

export const MapDataProvider = props => {
    const [data, setData] = useState([]);
    return (
        <MapDataContext.Provider value={[data, setData]}>
            {props.children}
        </MapDataContext.Provider>
    );
};