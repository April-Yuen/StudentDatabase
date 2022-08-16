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
        res.redirect('/students')
    }
)

// @desc logout user
// @route /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout(function(err){
        if(err) {return next(err);}
        res.redirect('/')
    })
})

module.exports = router;