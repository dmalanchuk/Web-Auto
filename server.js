const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Підключення до бази даних
const db = new sqlite3.Database('feedback.db');

db.run(`
    CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        rating INTEGER,
        description TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// Парсинг JSON
app.use(express.json());

// Дозвіл CORS - Cross-Origin Resource Sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

// Обробник POST-запитів для створення нового відгуку
app.post('/submit-feedback', (req, res) => {
    const { name, rating, description } = req.body;

    // Вставка даних у таблицю feedback
    db.run('INSERT INTO feedback (name, rating, description) VALUES (?, ?, ?)', [name, rating, description], (err) => {
        if (err) {
            console.error('Error inserting feedback:', err.message);
            res.status(500).json({ error: 'Error submitting feedback' });
        } else {
            console.log('Feedback submitted successfully.');
            res.json({ success: true });
        }
    });
});

// Обробник GET-запитів для отримання всіх відгуків
app.get('/submit-feedback', (req, res) => {
    db.all('SELECT * FROM feedback', (err, rows) => {
        if (err) {
            console.error('Error retrieving feedback:', err.message);
            res.status(500).json({ error: 'Error retrieving feedback' });
        } else {
            res.json(rows);
        }
    });
});

// Обробник PUT-запитів для оновлення відгуку за ID
app.put('/submit-feedback/:id', (req, res) => {
    const { id } = req.params;
    const { name, rating, description } = req.body;

    db.run(
        'UPDATE feedback SET name = ?, rating = ?, description = ? WHERE id = ?',
        [name, rating, description, id],
        function(err) {
            if (err) {
                console.error('Error updating feedback:', err.message);
                res.status(500).json({ error: 'Error updating feedback' });
            } else if (this.changes === 0) {
                res.status(404).json({ error: 'Feedback not found' });
            } else {
                res.json({ success: true });
            }
        }
    );
});

// Обробник DELETE-запитів для видалення відгуку за ID
app.delete('/submit-feedback/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM feedback WHERE id = ?', [id], function(err) {
        if (err) {
            console.error('Error deleting feedback:', err.message);
            res.status(500).json({ error: 'Error deleting feedback' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Feedback not found' });
        } else {
            res.json({ success: true });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/submit-feedback`);
});
