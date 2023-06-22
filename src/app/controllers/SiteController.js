const Course = require('./models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    //[GET] /
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
    //[GET] /search
}

module.exports = new SiteController();
