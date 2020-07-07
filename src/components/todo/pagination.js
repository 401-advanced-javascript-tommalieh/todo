import React, { useContext } from 'react';
import { SettingsContext } from '../../context/settings.js';


function Pagination(props){
    const siteContext = useContext(SettingsContext);
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(siteContext.numbersOfPages); i++){
        pageNumbers.push(i);
    }
    // console.log(siteContext.numbersOfPages)
    // console.log(pageNumbers)

    function changePage(number){
        console.log(number);
        siteContext.changeCurrentPage(number);
        console.log(siteContext.currentPage);
        // props.fetchPageItems();
    }

    return(
        <div>
            {pageNumbers.map(number => (
                <span key={number}>
                    <a onClick={() => changePage(number)} href='!#'> 
                      {number}  
                    </a>
                </span>
            ))}
        </div>
    )
}

export default Pagination;