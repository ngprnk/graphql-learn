import mongoose from 'mongoose';

const { Schema } = mongoose;


const AuthorSchema = new Schema({
  name: String,
  age: Number,
});


export default mongoose.model('Author', AuthorSchema);
