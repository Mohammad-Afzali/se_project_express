const clothingItemSchema = require("../models/clothingItem");
const { badRequest, notFound, serverError } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req.user._id);
  console.log(req);
  console.log(req.body);
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  clothingItemSchema
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      res.status(201).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(badRequest)
          .send({ message: "Invalid data provided" });
      }
      return res
        .status(serverError)
        .send({ message: "An error has occurred on the server" });
    });
};

const getItems = (req, res) => {
  clothingItemSchema
    .find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(serverError)
        .send({ message: "An error has occurred on the server" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  clothingItemSchema
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(badRequest)
          .send({ message: "Invalid data provided" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(notFound)
          .send({ message: "Id provided was not found" });
      }
      return res
        .status(serverError)
        .send({ message: "An error has occurred on the server" });
    });
};

const likeItem = (req, res) => {
  console.log(req.user._id);
  clothingItemSchema
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(badRequest)
          .send({ message: "Invalid data provided" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(notFound)
          .send({ message: "Id provided was not found" });
      }
      return res
        .status(serverError)
        .send({ message: "An error has occurred on the server" });
    });
};

const dislikeItem = (req, res) => {
  console.log(req.user._id);
  clothingItemSchema
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(badRequest)
          .send({ message: "Invalid data provided" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(notFound)
          .send({ message: "Id provided was not found" });
      }
      return res
        .status(serverError)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};