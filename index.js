const express = require("express");

const port = process.env.PORT || 3000;
const app = express();

// Product for page
app.get('/', (_, res) => {
    res.send('HI MEDO!!');
});

app.listen(port, async () => {
    console.log("Server is listening on port " + port);
});