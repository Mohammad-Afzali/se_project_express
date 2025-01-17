const router = require("express").Router();
const { updateUser, getUser } = require("../controllers/users");
const authorize = require("../middlewares/auth");

router.get("/me", authorize, getUser);
router.patch("/me", authorize, updateUser);

module.exports = router;