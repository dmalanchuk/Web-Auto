module.exports = app => {
    const feedback = require("../controllers/feedback.controller.js");
  
    const router = require("express").Router();
  
    // Створити новий відгук
    router.post("/", feedback.create);
  
    // Отримати всі відгуки
    router.get("/", feedback.findAll);
  
    // Видалити відгук за id
    router.delete("/:id", feedback.delete);
  
    app.use('/api/feedback', router);
  };
  