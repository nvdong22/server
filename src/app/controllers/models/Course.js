const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        author: { type: String },
        type: { type: String },
        price: { type: String },
        pricesale: { type: String },
        sold: { type: String },
        slug: { type: String, slug: 'name' },
    },
    {
        timestamps: true,
    },
);
//Custom query helper
Course.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'default',
        });
    }
    return this;
};
//Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model('Course', Course);
