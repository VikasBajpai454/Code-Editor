var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond on users route');
});

router.post('/signUp', function(req, res, next) {
    const { username, name, email, password } = req.body;
    // Add your logic to handle sign-up, e.g., save user to database
    // For now, let's assume the sign-up is always successful
    res.json({ success: true, message: 'Account created successfully' });
});

module.exports = router;