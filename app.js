require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const session = require("express-session");

const User = require("./models/User");
const passportConfig = require("./config/passport");
const postRoutes = require("./routes/postRoutes");
const errorHandler = require("./middlewares/errorHandler");
const commentRoutes = require("./routes/commentRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const Post = require("./models/Post");
const flash = require("connect-flash");
const app = express();
const PORT = process.env.PORT || 3000;

// Static files middleware (fixes CSS issue)
app.use(express.static("public"));

// Middlewares: Passing form data
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

// Method override middleware
app.use(methodOverride("_method"));

// Passport
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// EJS setup
app.set("view engine", "ejs");

// Home route
app.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
    error: "",
    title: "Home",
  });
});
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
// Routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/", commentRoutes);
app.use("/user", userRoutes);

// Error handler
app.use(errorHandler);






// Database connection and server start
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Database connected...");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });

