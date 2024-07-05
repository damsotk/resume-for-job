import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './movie-search.css';
import useBallsAnimation from '../../hooks/useBallsAnimation';

function MovieSearch() {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  const balls = useBallsAnimation();

  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingMovieId, setLoadingMovieId] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const fetchMovieDetails = async (imdbID) => {
    setLoadingMovieId(imdbID);
    setLoadingDetails(true);
    try {
      const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=6ff8b3f1`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setSelectedMovie(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoadingMovieId(null);
      setLoadingDetails(false);
    }
  };

  const handleMovieClick = (imdbID) => {
    fetchMovieDetails(imdbID);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleSearch = async (page = 1) => {
    if (searchTerm.trim() === '') {
      setError('Please enter a movie title.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&type=movie&page=${page}&apikey=6ff8b3f1`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      if (data.Search) {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10));
        setCurrentPage(page);
      } else {
        setMovies([]);
        setTotalResults(0);
      }
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    handleSearch(page);
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className='background'>
      <div className='containerForBalls'></div>
      <div className='header'>
        <div className='logo' onClick={() => navigateTo('/')}>
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
        <div className='buttonForSearch' onClick={() => handleSearch(1)} disabled={loading}>
          Search
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      {loading && <p className='loading'>Loading...</p>}
      <div className='containerWithFilms'>
        {movies.map((movie, index) => (
          <div className='film' key={index} onClick={() => handleMovieClick(movie.imdbID)}>
            {loadingMovieId === movie.imdbID ? (
              <p className='loading'>Loading...</p>
            ) : (
              <>
                {movie.Poster !== "N/A" ? (
                  <img className='filmPoster' src={movie.Poster} alt={`${movie.Title} poster`} />
                ) : (
                  <div className='placeholderPoster'>
                    <div className='emptyPoster'></div>
                  </div>
                )}
                <p className='filmTitle'>{movie.Title}</p>
              </>
            )}
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className='pagination'>
          {Array.from({ length: totalPages }, (_, index) => (
            <div
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active buttonForPag' : 'buttonForPag'}
            >
              {index + 1}
            </div>
          ))}
        </div>
      )}
      {isModalOpen && (
        <div className='modal'>
          <div className='modalContent'>
            <span className='close' onClick={closeModal}>&times;</span>
            {loadingDetails ? (
              <p className='loading'>Loading...</p>
            ) : (
              selectedMovie && (
                <div className='detailsOfFilm'>
                  <div className='nameOfFilm'>
                    <div className='nameFilm'>{selectedMovie.Title}, {selectedMovie.Rated}</div>
                    <div className='yearFilm'> {selectedMovie.Year}</div>
                  </div>
                  <div className='generalInfoAboutFilm'>
                    <div>
                      <div>Director: {selectedMovie.Director}</div>
                      <div>Writer: {selectedMovie.Writer}</div>
                      <div>Awards: {selectedMovie.Awards}</div>
                      <div>Actors: {selectedMovie.Actors}</div>
                    </div>
                    <div className='gen'>
                      <div>Runtime: {selectedMovie.Runtime}</div>
                      <div>Genre: {selectedMovie.Genre}</div>
                      <div>Language: {selectedMovie.Language}</div>
                      <div>Country: {selectedMovie.Country}</div>
                      <div>Released: {selectedMovie.Released}</div>
                    </div>
                  </div>
                  <div className='descFilm'>{selectedMovie.Plot}</div>
                  <div className='ratesFilm'>
                    <div>Metascore: {selectedMovie.Metascore}</div>
                    <div>imdbRating: {selectedMovie.imdbRating}</div>
                    <div>imdbVotes: {selectedMovie.imdbVotes}</div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieSearch;