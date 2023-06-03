import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ amazon: [], croma: [] });
  const [isLoading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await axios.get(
      `${REACT_APP_API_URL}/products/search?keyword=${query}`
    );

    setResults(res.data);
    setLoading(false);
  };

  const openLink = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading ? (
        <p className="loading">Loading... This may take a few seconds...</p>
      ) : results.amazon.length ? (
        <div className="results-container">
          <div>
            <h2>Amazon</h2>
            {results.amazon.map((product, i) => (
              <div
                className="product-card"
                key={i}
                onClick={() => openLink(product.link)}
              >
                <img src={product.image} alt={product.description} />
                <p>{product.description}</p>
                <p>{product.price}</p>
              </div>
            ))}
          </div>

          <div>
            <h2>Croma</h2>
            {results.croma.map((product, i) => (
              <div
                className="product-card"
                key={i}
                onClick={() => openLink(product.link)}
              >
                <p>{product.description}</p>
                <p>{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Search something to get started.</p>
      )}
    </div>
  );
};

export default Search;
