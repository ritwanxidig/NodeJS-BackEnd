import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const userModel = mongoose.model("User", userScheme);

export const getAll = () => userModel.find();
export const getById = (id: string) => userModel.findById(id);
export const getByEmail = (email: string) =>
  userModel.findOne({ email: email });
export const getByUsername = (username: string) =>
  userModel.findOne({ username: username });
export const create = (values: Record<string, any>) =>
  new userModel(values).save().then((res) => res.toObject());
export const update = (id: string, values: Record<string, any>) =>
  userModel.findByIdAndUpdate(id, values);
export const deleteOne = (id: string) => userModel.findByIdAndDelete(id);
