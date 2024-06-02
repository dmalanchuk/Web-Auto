const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Feedback = require('./models/feedback');

const app = express();
const port = 3000;

// Підключення до MongoDB
mongoose.connect('mongodb://localhost:27017/feedbackdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Перевірка підключення до бази даних
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Налаштування body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Маршрут для отримання всіх відгуків
app.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Маршрут для створення нового відгуку
app.post('/feedbacks', async (req, res) => {
  const feedback = new Feedback({
    name: req.body.name,
    message: req.body.message
  });

  try {
    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Маршрут для видалення відгуку
app.delete('/feedbacks/:id', async (req, res) => {
  try {
    const removedFeedback = await Feedback.findByIdAndRemove(req.params.id);
    if (!removedFeedback) {
      return res.status(404).send('Feedback not found');
    }
    res.json(removedFeedback);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
