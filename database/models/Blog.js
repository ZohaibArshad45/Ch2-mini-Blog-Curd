import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  des:String,
});

const BlogModel = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default BlogModel;
