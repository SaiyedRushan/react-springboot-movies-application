package com.movies.project.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    @Autowired
    private MoviesRepository moviesRepository;
    public List<Movie> allMovies() {
        return moviesRepository.findAll();
    }

    public Optional<Movie> singleMovie(String imdbId) {
        return moviesRepository.findMovieByImdbId(imdbId);
    }

}
