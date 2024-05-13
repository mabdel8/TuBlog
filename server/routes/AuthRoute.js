const { Signup, Login, Lotout } = require("../AuthController");
const router = require("express").Router();
const { userVerification } = require('../Middlewares/AuthMiddleware')

router.post("/signup", Signup);
router.post('/login', Login)
router.post('/', userVerification)

// Logout route
router.post('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' });
    return res.json({ status: true, message: 'Logged out successfully' });
});


module.exports = router;