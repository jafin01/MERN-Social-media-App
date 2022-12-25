import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const connectToDB = async (listenToPort) => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    // eslint-disable-next-line no-console
    console.log(`mongoDB connected to ${connect.connection.host}`.cyan.underline);
    listenToPort();
  } catch (error) {
    throw new Error(error.message);
  }
};

export default connectToDB;
