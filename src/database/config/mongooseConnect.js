import envData from 'configs/envData';
import mongoose from 'mongoose';

const mongooseConnect = () => {
  try {
    mongoose.connect(envData.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.once('open', () => {
      console.log('Connected successfully');
    });
  } catch (error) {
    console.log('could not connect to db', error.message);
  }
};

export default mongooseConnect;
