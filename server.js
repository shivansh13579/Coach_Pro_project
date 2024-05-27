const app = require("./app");
const dbConnection = require("./database/dbConnection");

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await dbConnection();
  console.log(`Server is running on port ${port}`);
});
