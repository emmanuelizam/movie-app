import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

//image
import searchIcon from "../../images/search-icon.svg";

//styles
import { Wrapper, Content } from "./SearchBar.styles";

const SearchBar = ({ setSearchTerm }) => {
  // this component is called a controlled component
  // a controlled component's value is controlled by react
  const [state, setState] = useState("");

  // do not trigger a rerender
  const initial = useRef(true);

  useEffect(() => {
    // skip the initial render in the useEffect
    if (initial.current) {
      initial.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);
    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);
  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt="search-icon" />
        <input
          type="text"
          placeholder="Search Movie"
          onChange={(event) => setState(event.currentTarget.value)}
          value={state}
        />
      </Content>
    </Wrapper>
  );
};

SearchBar.propTypes = {
  callback: PropTypes.func,
};
export default SearchBar;
