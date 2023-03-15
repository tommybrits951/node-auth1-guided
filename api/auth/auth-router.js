const router = require('express').Router();


router.post('/register', async (req, res, next) => {//eslint-disable-line
    res.json({message: 'register working'})
})
router.post('/login', async (req, res, next) => {//eslint-disable-line
    res.json({message: 'login working'})
})
router.get('/logout', async (req, res, next) => {//eslint-disable-line
    res.json({message: 'logout working'})
})


module.exports = router;