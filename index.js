const express = require('express');
const app = express();
const db = require('./Database/Db')


app.use(express.json())
const PORT = process.env.PORT || 5151;


// Routes and middleware
// ...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});