const Course = require('./models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}).sortable(req),
            Course.countDocumentsDeleted(),
        ])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
    //[GET] /me/trash/courses

    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) => {
                const deletedCourses = courses.filter(
                    (course) => course.deleted === true,
                );
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(deletedCourses),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
