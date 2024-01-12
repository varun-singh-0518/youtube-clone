import React, {createContext, useEffect, useState} from "react";
import {fetchDataFromApi} from "../utils/api";

//creating context for managing state globally
export const Context = createContext();

export const AppContext = (props) => {
  const [loading, setLoading] = useState(false); //creating a variable that represents whether data is currently being loaded.
  const [searchResults, setSearchResults] = useState([]); //An array state variable that will store search results
  const [selectCategories, setSelectCategories] = useState("New"); //A string state variable representing the selected category. Initializing it with "New" to show the new videos on the home page.
  const [mobileMenu, setMobileMenu] = useState(false); //A boolean state variable that indicates whether a mobile menu is open or not.

  // whenever the category changes we have to fetch the new selected category data.
  useEffect(() => {
    fetchSelectedCategoryData(selectCategories);
  }, [selectCategories]);

  //function for fetching data from the API based on the query provided.
  // Here the query is the selected category variable
  const fetchSelectedCategoryData = (query) => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${query}`).then(({contents}) => {
      console.log(contents);
      //stores the response in the SearchResults array
      setSearchResults(contents);
      setLoading(false);
    });
  };

  return (
    //This provider component makes the state and state-setting functions available to its descendants through the context.
    <Context.Provider
      value={{
        loading,
        setLoading,
        searchResults,
        setSearchResults,
        selectCategories,
        setSelectCategories,
        mobileMenu,
        setMobileMenu,
      }}
    >
      {/* wrapping the child components around the context provider .These
      components will have access to the data and functions provided by the
      context. */}

      {props.children}
    </Context.Provider>
  );
};
