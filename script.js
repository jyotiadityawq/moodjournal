
function displayUserName() {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
        document.getElementById('user-name').textContent = `Welcome, ${storedName}!`;
    } else {
        const name = prompt('Please enter your name:');
        localStorage.setItem('userName', name);
        document.getElementById('user-name').textContent = `Welcome, ${name}!`;
    }
}


async function fetchEmoji(mood) {
    const apiKey = 'Plsuseyourownapi api not entered due to security reasons';
    const url = `https://emojify-app.herokuapp.com/emojify?api_key=${apiKey}&text=${mood}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch emoji');
        }
        const data = await response.json();
        return data.emoji;
    } catch (error) {
        console.error('Failed to fetch emoji:', error);
        return '😐'; 
    }
}


function displayMoodHistory() {
    const moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];

    const moodHistoryContainer = document.getElementById('mood-history');
    moodHistoryContainer.innerHTML = '';

    moodHistory.forEach(entry => {
        const moodEntry = document.createElement('div');
        moodEntry.classList.add('mood-entry');
        moodEntry.innerHTML = `
            <p><strong>${entry.timestamp}</strong>: ${entry.mood} ${entry.emoji}</p>
        `;
        moodHistoryContainer.appendChild(moodEntry);
    });
}


document.getElementById('mood-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const mood = document.getElementById('mood').value;
    const timestamp = new Date().toLocaleString();
    
    
    const emoji = await fetchEmoji(mood);
    document.getElementById('emoji-container').textContent = emoji;

    
    const moodEntry = {
        timestamp,
        mood,
        emoji
    };

    let moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
    moodHistory.push(moodEntry);
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));

    
    displayMoodHistory();
});


displayUserName();
displayMoodHistory();
