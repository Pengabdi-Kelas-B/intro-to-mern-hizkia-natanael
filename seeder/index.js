const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");

async function main() {
  /**--------------- Not allowed to be edited - start - --------------------- */
  const mongoUri = process.env.MONGODB_URI;
  const collection = process.env.MONGODB_COLLECTION;

  const args = process.argv.slice(2);
  const command = args[0];
  /**--------------- Not allowed to be edited - end - --------------------- */

  // Connect to MongoDB
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Define a schema for the collection
  const schema = new mongoose.Schema({
    title: String, // diperbaiki dari 'tittle'
    year: Number,
    genre: [String],
    description: String,
    director: String,
    cast: [String],
  }, { strict: false });

  const Model = mongoose.model(collection, schema);

 
  switch (command) {
    case "check-db-connection":
      console.log("check db connection started...");
      try {
        await mongoose.connection.db.admin().ping();
        console.log("MongoDB connection is successful!");
      } catch (err) {
        console.error("MongoDB connection failed:", err);
      }
      console.log("check db connection ended...");
      break;

    case "bulk-insert":
      try {
        const data = JSON.parse(fs.readFileSync("seed.json", 'utf-8'));

        for (const movie of data) {
          const movieModel = new Model({
            title: movie.title,
            year: movie.year,
            genre: movie.genre,
            description: movie.description,
            director: movie.director,
            cast: movie.cast,
          });

          await movieModel.save(); // Save each movie to the database
        }

        console.log("Bulk insert berhasil!");
      } catch (err) {
        console.error("Bulk insert gagal:", err);
      }
      break;

    case "get-all":
      const movieDataGetAll = await Model.find()
      console.log(movieDataGetAll);
      console.log("Get all berhasil!");
      break;
    
    case "reset-db":
     await Model.deleteMany()
      console.log("Reset Data berhasil!");
      break;

    // TODO: Tambahkan logic fungsionalitas lainnya di sini jika diperlukan
    default:
      throw Error("command not found");
  }

  // Disconnect from MongoDB after operations
  await mongoose.disconnect();
  return;
}

main();
