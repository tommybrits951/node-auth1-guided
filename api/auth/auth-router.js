const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../users/users-model')



router.post('/register', async (req, res, next) => {//eslint-disable-line
    try {
    const { username, password } = req.body
    const hash = bcrypt.hashSync(password, 8)
    const newUser = { username, password: hash }
    const result = await User.add(newUser)
    res.status(201).json({
        message: `Welcome to the team ${result.username}`
    })
    } catch (err) {
        next(err)
    }
})
router.post('/login', async (req, res, next) => {//eslint-disable-line
    try {
        const { username, password } = req.body;
        const [user] = await User.findBy({ username });
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.status(200).json({message: `Welcom back ${username}`} )
        } else {
            res.status(401).json({message: 'gonna need to see id'})
        }
    } catch (err) {
        next(err)
    }
})
router.get('/logout', async (req, res, next) => {//eslint-disable-line
    if(req.session.user) {
        const { username } = req.session.user;
        req.session.destroy(err => {
            if (err) {
                res.json({message: `your my bitch now`})
            }  else {
                res.json({message: `Goodbye ${username}`})
            }
        })
    } else {
        res.json({message: 'Who the fuck are you?'})
    }
})
router.use((err, req, res, next) => {//eslint-disable-line
    res.status(500).json({
        message: "something got fucked up"
    })
})

module.exports = router;