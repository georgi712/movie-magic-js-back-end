import Cast from "../models/Cast.js";
export default {
    create(castData) {
        return Cast.create(castData);
    },
    getAll(filter = {}) {
        let query = Cast.find({});

        if (filter.exclude) {
            query = query.find({_id: {$nin: filter.exclude}})
        }

        return query;
    }
}