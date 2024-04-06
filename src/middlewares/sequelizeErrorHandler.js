function sequelizeErrorHandler(err, req, res, next) {
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: err.errors[0].message })
    } else if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map(error => ({
            field: error.path,
            message: error.message
        }));
        return res.status(422).json({ errors: errors })
    } else {
        next(err);
    }
}

module.exports = sequelizeErrorHandler;
