import { type Dispatch, type FormEvent, type SetStateAction } from "react";

interface searchTypeRecipesProps {
  handleSearch: (e: FormEvent<Element>) => void;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}
function SearchTypeRecipes({
  handleSearch,
  searchQuery,
  setSearchQuery,
  

}: searchTypeRecipesProps) {
  return (

    <form onSubmit={handleSearch} className="search-form">
      <div className="search-input-group">
        <input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          type="text"
          placeholder="Search for recipes (e.g., pasta, chicken, vegetarian)..."
          className="search-input"
        />

        <button className="search-btn" type="submit">
          Search
        </button>
      </div>
    </form>

  )
}

export default SearchTypeRecipes