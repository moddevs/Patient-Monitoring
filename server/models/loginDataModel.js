import mongoose from "mongoose";

const loginDataSchema = mongoose.Schema({
  docUsername: String,
  authPersonUsername: String,
});

const LoginDataModel = mongoose.model("LoginDataModel", loginDataSchema);

export default LoginDataModel;
