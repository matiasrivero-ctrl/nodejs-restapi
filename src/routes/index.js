const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');
const _ = require('underscore');

const movies = require('../../db.json');

router.get('/', (req, res) => {
    res.json({
        "title": "Hello World",
        "name": "Matías Rivero"
    });
});

router.get('/api/movies', (req, res) => {
    res.json({
        "movies": movies
    });
});

router.post('/api/movies',
    check('title')
    .exists()
    .notEmpty(),
    check('director')
    .exists()
    .notEmpty(),
    check('year')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('rating')
    .exists()
    .notEmpty()
    .isNumeric()
, (req, res) => {
    const errors = validationResult(req);
   
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    
    const id = movies.length + 1;
    const newMovies = {id, ...req.body}

    movies.push(newMovies);
    res.json(movies);
});

router.put('/api/movies/:id', 
    check('title')
    .exists()
    .notEmpty(),
    check('director')
    .exists()
    .notEmpty(),
    check('year')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('rating')
    .exists()
    .notEmpty()
    .isNumeric()
, (req, res) => {
    const {id} = req.params;

    const errors = validationResult(req);
   
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { title, director, year, rating } = req.body;

    _.each(movies, (movie, i) => {
        if(movie.id == id) {
            movie.title = title;
            movie.director = director;
            movie.year = year;
            movie.rating = rating;
        }
    });

    res.status(200).json({
        msg: 'Information has been updated'
    })
});

router.delete('/api/movies/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);

    _.each(movies, (movie, i) => {
        if(movie.id == id) {
            movies.splice(i, 1);
        }
    });

    res.json(movies);
})


module.exports = router;

// Retomar video: https://youtu.be/bK3AJfs7qNY?t=3786
