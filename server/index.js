// node_modules
const express = require("express");

// setups
const { backendSetup, databaseSetup } = require("./setup");

const app = express();

databaseSetup(() => {
    backendSetup(app);
});

// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3000;

// /*
//     Incase you are using mongodb atlas database uncomment below line
//     and replace "mongoAtlasUri" with your mongodb atlas uri.
// */
// // mongoose.connect( mongoAtlasUri, {useNewUrlParser: true, useUnifiedTopology: true})

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// app.listen(port, () => {
//     console.log(`App listening at http://localhost:${port}`);
// });
