const express = require('express');
const passport = require('passport')
const router = express.Router();

// @desc Auth with Google
// @route GET/auth/Google
router.get('/google', passport.authenticate('google', {scope:['profile']}))

// @desc Google auth callback
// @route Get/Auth/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
    (req, res) => {
        res.redirect('/index')
    }
)
module.exports = router;