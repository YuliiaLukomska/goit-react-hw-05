import { useState } from "react";
import css from "./SearchBar.module.css";

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!query.trim()) {
      alert("Enter some text");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search film"
          name="query"
          value={query}
          onChange={handleChange}
          className={css.input}
        />
        <button className={css.formBtn} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};
