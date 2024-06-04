document.getElementById('feedbackForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const rating = document.getElementById('rating').value;
    const description = document.getElementById('description').value;

    const response = await fetch('http://localhost:3000/submit-feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, rating, description }),
    });

    if (response.ok) {
        alert('Feedback submitted successfully');
        loadFeedback();
    } else {
        alert('Error submitting feedback');
    }
});

async function loadFeedback() {
    const response = await fetch('http://localhost:3000/submit-feedback');
    const feedbackList = document.getElementById('feedbackList');
    feedbackList.innerHTML = '';

    if (response.ok) {
        const feedbacks = await response.json();
        feedbacks.forEach(feedback => {
            const feedbackDiv = document.createElement('div');
            feedbackDiv.className = 'feedback-container';
            feedbackDiv.innerHTML = `
            <header>
            <nav>
                <main>
                    <p><strong>Name:</strong> ${feedback.name}</p>
                    <p><strong>Rating:</strong> ${feedback.rating}</p>
                </main>
                <footer>
                    <p><strong>Description:</strong> ${feedback.description}</p>
                    <p><strong>Timestamp:</strong> ${feedback.timestamp}</p>
              </footer>
              <div>
                    <button onclick="updateFeedback(${feedback.id})">Оновлення</button>
                     <button onclick="deleteFeedback(${feedback.id})">Видалення</button>
                </div>
            </nav>
            </header>
          `;
            feedbackList.appendChild(feedbackDiv);
        });
    } else {
        feedbackList.innerHTML = 'Error loading feedback';
    }
}

async function updateFeedback(id) {
    const name = prompt('Enter new name:');
    const rating = prompt('Enter new rating:');
    const description = prompt('Enter new description:');

    const response = await fetch(`http://localhost:3000/submit-feedback/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, rating, description }),
    });

    if (response.ok) {
        alert('Feedback updated successfully');
        loadFeedback();
    } else {
        alert('Error updating feedback');
    }
}

async function deleteFeedback(id) {
    const response = await fetch(`http://localhost:3000/submit-feedback/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        alert('Feedback deleted successfully');
        loadFeedback();
    } else {
        alert('Error deleting feedback');
    }
}

// Initial load of feedback
loadFeedback();