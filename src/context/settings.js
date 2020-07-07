import React, {useState} from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props){
    const [display, setDisplay] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [numbersOfPages, setNumberOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('difficulty');
    const state = {
        display,
        itemsPerPage,
        numbersOfPages,
        currentPage,
        sortBy,
        changeDisplay: setDisplay,
        changeItemsPerPage: setItemsPerPage,
        changeNumberOfPages: setNumberOfPages,
        changeCurrentPage: setCurrentPage,
        changeSort: setSortBy
    }

    return(
        <SettingsContext.Provider value={state}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export default SettingsProvider;