// Installs
const express = require("express");
const cors = require("cors");
require("./models");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const routes = require("./routes");

const app = express();

//  Middleware
app.use(express.json());

const corsConfig = {
  origin: [`http://localhost:3000`],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsConfig));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: require("./models").mongooseConnection,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 48,
    },
  })
);
app.use(express.json());

// Splash page
app.get("/", (req, res, next) => {
  return res.status(200).json({ status: 200, title: "Splashy" });
});

// Routes

// Start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening @ Port ${PORT}`));
