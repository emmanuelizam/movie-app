// react wants the name of your custom hooks to start with use

import { useState, useEffect, useRef, useCallback } from "react";

//API
import API from "../API";

//Helpers
import { isPersistedState } from "../helpers";

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  /*
    if you provide setState with an inline function argument, it takes the present state as an argument.
    i.e. setState((state)=>{})
    If you provide it with just an argument, it sets it as the state
    */
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  console.log(searchTerm);

  // the array in the useCallback function is used to put variables that will make useEffect to run again once they change.
  //
  const fetchMovies = useCallback(async (page, searchTerm = "") => {
    try {
      // this sets error to false
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);
      console.log({ ...movies });

      // this takes prev(=state) as an argument
      setState((prev) => {
        return {
          ...movies,
          results:
            page > 1
              ? [...prev.results, ...movies.results]
              : [...movies.results],
        };
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, []);

  // Initial render
  // useEffect does not require await
  // the entire fetchMovies function could have been written inside useEffect like in this example I got from stackoverflow:
  /*
        function Example() {
            const [data, dataSet] = useState<any>(null)

            useEffect(() => {
                async function fetchMyAPI() {
                    let response = await fetch('api/data')
                    response = await response.json()
                    dataSet(response)
                }

                fetchMyAPI()
            }, [])

            return <div>{JSON.stringify(data)}</div>
        }

        ## https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
        */
  // the empty array is used to enter which function will run again if the corresponding variable in the  fetchMovies function changes

  // Initial and search
  useEffect(() => {
    if (!searchTerm) {
      const sessionState = isPersistedState("homeState");

      if (sessionState) {
        console.log("grabbing from sessionStorage");
        setState(sessionState);
        return;
      }
    }
    console.log("grabbing from api");
    // wipe current state before search
    setState(initialState);
    fetchMovies(1, searchTerm);
  }, [fetchMovies, searchTerm]);

  // Load more
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [fetchMovies, isLoadingMore, searchTerm, state.page]);

  // write to sessionStorage
  useEffect(() => {
    if (!searchTerm) {
      sessionStorage.setItem("homeState", JSON.stringify(state));
    }
  }, [searchTerm, state]);
  // in es6 syntax, the values in the dictionary below will be automatically assingned a key of same value
  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};
