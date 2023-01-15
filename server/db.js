const mongoose = require('mongoose');

(async function () {
  const { MONGO_PASS, MONGO_URL } = process.env;
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGO_URL.replace('<password>', MONGO_PASS));
    console.log('Database connected successfully');
  } catch (err) {
    console.log({ err });
    throw new Error('database failed to connect', err);
  }
})();
