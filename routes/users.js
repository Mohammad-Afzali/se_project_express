const express = require("express").Router();
const { updateUser, getUser } = require("../controllers/user");
const authorize = require("../middlewares/auth");

const router = express.Router();

router.get("/me", authorize, getUser);
router.patch("/me", authorize, updateUser);

module.exports = router;