import mongoose from 'mongoose';

const { Schema } = mongoose;

const BookSchema = new Schema({
  name: String,
  genre: String,
  authorID: String,
});


export default mongoose.model('Book', BookSchema);
