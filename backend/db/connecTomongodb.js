import mongoose from "mongoose";
const connecTomongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("connected to mongoDB🎉");
  } catch (error) {
    console.log("Erron in connecting to mongoDB💀", error.message);
  }
};
export default connecTomongodb;
