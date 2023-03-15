

async function protect(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.status(500).json({message: "get the fuck out"})
    }
}


module.exports = {
    protect
}