const Course = require('./models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
class ApiController {
    apiCoures(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.json(courses);
            })
            .catch(next);
    }
    showApi(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.json(course);
            })
            .catch(next);
    }
    async search(req, res) {
        let courses = await Course.find({
            $or: [
                { name: { $regex: req.params.key, $options: 'i' } },
                { slug: { $regex: req.params.key, $options: 'x' } },
            ],
        });
        res.json(courses);
    }
}

module.exports = new ApiController();
