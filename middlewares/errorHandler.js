const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error", {       // ✅ Corrected
        title: "Error",
        error: err.message,     // ✅ Corrected
        user: req.user,
    });
};

module.exports = errorHandler;
