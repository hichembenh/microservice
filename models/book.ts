// import mongoose from "mongoose";
// import mongoosePaginate from "mongoose-paginate";
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoosePaginate')

let bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true}
});
bookSchema.plugin(mongoosePaginate);
const Book = mongoose.model("Book", bookSchema);
export default Book;