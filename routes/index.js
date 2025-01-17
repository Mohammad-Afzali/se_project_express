const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { notFound } = require("../utils/errors");
const { login, createUser } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(notFound).send({ message: "Router not found" });
});

module.exports = router;