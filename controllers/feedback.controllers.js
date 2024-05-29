const db = require("../models");
const Feedback = db.feedback;

// Створення нового відгуку
exports.create = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.message) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const feedback = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  };

  Feedback.create(feedback)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Feedback."
      });
    });
};

// Отримання всіх відгуків
exports.findAll = (req, res) => {
  Feedback.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving feedback."
      });
    });
};

// Видалення відгуку за id
exports.delete = (req, res) => {
  const id = req.params.id;

  Feedback.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Feedback was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Feedback with id=${id}. Maybe Feedback was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Feedback with id=" + id
      });
    });
};
