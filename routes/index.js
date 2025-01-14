const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { notFound } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  res.status(notFound).send({ message: "Router not found" });
});

module.exports = router;