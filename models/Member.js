const memberSchema = new mongoose.Schema({
  name: String,
  role: [String], // <-- change this line
  bio: String,
  image: String,
  github: String,
  linkedin: String,
  email: String
});