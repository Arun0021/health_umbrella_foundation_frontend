import React, { useState } from "react";
import "./SearchBar_v2.css";
import { useNavigate, NavLink } from 'react-router-dom';



function SearchBar(props) {
    const searchData = props.diseaselist;

    const [resultData, setResultData] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    // implemented the search feature
    // took the input from search input and matched with all the elements
    // with the all the elements in the array got from server and showed the elements
    // in which input was present as substring
    const handleChange = (event) => {
        const searchInputData = String(event.target.value).toLowerCase();
        setSearchInput(String(event.target.value).toLowerCase());
        if (searchInputData === "") {
            setResultData([]);
        } else {
            let newresultdata = searchData.filter((value) => {
                return value.includes(searchInputData);
            });
            setResultData(newresultdata);
        }
    }

    const handleClick = () => {
        navigate(`/disease/${searchInput}`);
    }
    const scrollToTopOnClick = () => {
        window.scrollTo(0, 0);
      };
    



    return (
        <div className="search_container">
            <div className="search_outer">
                <input placeholder="Search by Disease" type="text" className="search_outer_input"
                    onChange={handleChange}
                />
                <button className="search_outer_button1" onClick={handleClick}>Search</button>
                <button className="search_outer_button2" onClick={handleClick}><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>

            {resultData.length !== 0 && <div className="dataResult">
                {resultData.slice(0, 5).map((value) => {
                    return <NavLink className="dataItem" to={`/disease/${value}`} key={value} onClick={scrollToTopOnClick}>{value}</NavLink>
                })}
            </div>}
        </div>

    );
}

export default SearchBar;