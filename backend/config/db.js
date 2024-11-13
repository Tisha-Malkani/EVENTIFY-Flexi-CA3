const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
