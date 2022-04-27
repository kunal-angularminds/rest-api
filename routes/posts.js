const router = require('express').Router();
const verify = require('./verifyToken');

router.get("/",verify,(req, res) => {
    res.send(req.user)
    // res.json({
    //     posts: {
    //         title: "posts",
    //         description: "random posts that are accesses by only authorized user"
    //     }
    // });
});

module.exports = router;