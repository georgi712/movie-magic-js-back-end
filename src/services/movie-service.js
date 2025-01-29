import Movie from "../models/Movie.js";

export default {
    getOne(movieId) {
        const result = Movie.findById(movieId);
        return result;
    },

    getOneWithCast(movieId) {
        return this.getOne(movieId).populate('casts.cast');
    },

    async create(movieData, creatorId) {

        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
            creator: creatorId,
        });

        return result;

    },

    getAll(filter = {}) {
            let query = Movie.find({});

            if (filter.search) {
                query = query.where({title: filter.search});
            }
            if (filter.genre) {
                query = query.where({genre: filter.genre})
            }
            if (filter.year) {
                query = query.where({year: Number(filter.year)})
            }

            return query;
    },
    async attachCast(movieId, castId, character) {

        // const movie = await Movie.findById(movieId);
        // if (movie.casts.includes(castId)) {
        //     return;
        // }
        
        // movie.casts.push(castId);
        // await movie.save();

        // return movie;
        return Movie.findByIdAndUpdate(movieId, { 
            $push: {
                    casts: {
                        cast: castId,
                        character
                    }
                }
        });
    },
    delete(movieId) {
        return Movie.findByIdAndDelete(movieId);
    },
    update(movieId, movieData) {
        return Movie.findByIdAndUpdate(movieId, movieData)
    }
};