function createMovies(db) {
  db.createCollection("Movies", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title", "overview", "tags", "popularity", "poster_path"],
        properties: {
          title: {
            bsonType: "string",
            description: "Title must be a string and is required !",
          },
          overview: {
            bsonType: "string",
            description: "Overview must be a string and is required !",
          },
          poster_path: {
            bsonType: "string",
            description: "Poster Path must be a string if it's exist",
          },
          popularity: {
            bsonType: ["double"],
            description: "popularity must be double typed if it's exist.",
          },
          tags: {
            type: ["array", "string"],
            description: "Tags must be a string and is required !",
          },
        },
      },
    },
  });
  console.log("Movies Collection Created.");
}

module.exports = createMovies