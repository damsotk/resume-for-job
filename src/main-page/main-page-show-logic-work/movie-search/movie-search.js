import React, { useState } from 'react';
import './movie-search.css';

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setError('Please enter a movie title.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&type=movie&apikey=6ff8b3f1`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='background'>
      <div className='header'>
        <div className='logo'>
          damsot
        </div>
        <div className='copyright'>
          Created using the «OMDb API»
        </div>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter movie title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='inputForSearch'
        />
        <div className='buttonForSearch' onClick={handleSearch} disabled={loading}>
          Search
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      {loading && <p className='loading'>Loading...</p>}
      <div className='containerWithFilms'>
        {movies.map((movie, index) => (
          <div className='film' key={index}>
            {movie.Poster !== "N/A" ? (
              <img className='filmPoster' src={movie.Poster} alt={`${movie.Title} poster`} />
            ) : (
              <div className='placeholderPoster'>
                <div className='emptyPoster'></div>
              </div>
            )}
            <p className='filmTitle'>{movie.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;