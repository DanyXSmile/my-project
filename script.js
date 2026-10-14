// --- EXPANDED ARTWORKS DATA WITH RICH HISTORICAL CONTEXT ---
const artworksData = [
    { 
        id: "boccioni", // Folder ID matching 'boccioni'
        artist: "Umberto Boccioni", 
        century: "20th Century", 
        year: "1913", 
        info: "Unique Forms of Continuity in Space (1913) is a landmark masterpiece of the Italian Futurist movement. Depicting a human-like figure striding forcefully through dynamic space, Boccioni sculpted the aerodynamic wind and motion surrounding the figure rather than just a static body. It stands today as an iconic symbol of modern speed, technological vigor, and industrial revolution." 
    },
    { 
        id: "botticelli", 
        artist: "Sandro Botticelli", 
        century: "15th Century", 
        year: "c. 1484–1486", 
        info: "The Birth of Venus depicts the classical goddess of love emerging fully grown from the ocean waves, guided to shore on a giant scallop shell by Zephyrus, the god of the west wind. Commissioned by the influential Medici family of Florence, Botticelli's revolutionary composition departed from medieval religious painting to embrace mythological Classical humanism." 
    },
    { 
        id: "jesus", 
        artist: "Leonardo da Vinci", 
        century: "15th Century", 
        year: "1495–1498", 
        info: "The Last Supper is a monumental mural painting covering the refectory wall of the Santa Maria delle Grazie monastery in Milan. Leonardo captured the exact emotional climax following Christ's declaration that one of his disciples would betray him. Using innovative linear perspective and psychological realism, Leonardo grouped the apostles in dramatic trios." 
    },
    { 
        id: "leo", 
        artist: "Leonardo da Vinci", 
        century: "15th Century", 
        year: "c. 1490", 
        info: "Vitruvian Man is an iconic pen-and-ink drawing on paper illustrating the ideal geometric proportions of the human body as recorded by ancient Roman architect Vitruvius. Leonardo's famous dual-positioned figure inside a square and circle synthesizes Renaissance art, human anatomy, and sacred geometry into a unified concept." 
    },
    { 
        id: "monalisa", 
        artist: "Leonardo da Vinci", 
        century: "16th Century", 
        year: "1503–1519", 
        info: "The Mona Lisa (La Gioconda) is widely regarded as the most famous painting in human history. Permanently displayed at the Louvre Museum in Paris, it depicts Lisa Gherardini. Leonardo employed soft sfumato shading to dissolve sharp outlines, creating her enigmatic smile and integrating her seated posture into a vast, misty atmospheric landscape." 
    },
    { 
        id: "monet", 
        artist: "Claude Monet", 
        century: "19th Century", 
        year: "1872", 
        info: "Impression, Sunrise captures the hazy port of Le Havre at dawn through loose, rapid brushstrokes and vivid light effects. When displayed at the famous 1874 independent Paris exhibition, art critic Louis Leroy used the title mockingly to coin the term 'Impressionism'—a label the movement proudly adopted." 
    },
    { 
        id: "mucha", 
        artist: "Alphonse Mucha", 
        century: "19th Century", 
        year: "1894–1896", 
        info: "Alphonse Mucha revolutionized Parisian graphic design with his distinct Art Nouveau posters featuring theatrical icon Sarah Bernhardt. Defined by flowing organic curves, floral motifs, pastel color schemes, and haloed female figures, 'Le Style Mucha' became synonymous with Belle Époque elegance." 
    },
    { 
        id: "napoleone", 
        artist: "Jacques-Louis David", 
        century: "19th Century", 
        year: "1801–1805", 
        info: "Napoleon Crossing the Alps is an idealized Neoclassical equestrian portrait celebrating First Consul Napoleon Bonaparte leading his army through the Great St. Bernard Pass. David used dramatic diagonal composition, wind-whipped drapes, and monumental grandeur to transform actual military history into legendary propaganda." 
    },
    { 
        id: "night", 
        artist: "Vincent van Gogh", 
        century: "19th Century", 
        year: "1889", 
        info: "The Starry Night was created from Van Gogh's asylum room window at Saint-Paul-de-Mausole in Saint-Rémy-de-Provence. Featuring a swirling cosmic sky, vibrant glowing crescent moon, and towering dark cypress tree, Van Gogh applied thick impasto brushstrokes to express turbulent inner emotion through Post-Impressionist landscape art." 
    },
    { 
        id: "picnic", 
        artist: "Georges Seurat", 
        century: "19th Century", 
        year: "1884–1886", 
        info: "A Sunday Afternoon on the Island of La Grande Jatte is a monumental masterpiece that founded the Neo-Impressionist Pointillism technique. Seurat systematically applied millions of tiny, distinct dots of pure color that blend optically in the viewer's eye to depict 19th-century Parisians relaxing along the Seine River." 
    }
];

// Random Pool for Distractor Options
const allArtists = [...new Set(artworksData.map(a => a.artist)), "Michelangelo", "Pablo Picasso", "Rembrandt", "Salvador Dalí", "Johannes Vermeer", "Edvard Munch"];
const allCenturies = ["14th Century", "15th Century", "16th Century", "17th Century", "18th Century", "19th Century", "20th Century", "21st Century"];

// --- GAME STATE VARIABLES ---
let username = "";
let difficulty = "easy";
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let quizSequence = [];

let selectedImage = null;
let selectedArtist = null;
let selectedCentury = null;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    loadLeaderboardDisplay('easy'); // Render initial leaderboard on page load
});

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Difficulty Button Selectors
document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('selected'));
        const target = e.currentTarget;
        target.classList.add('selected');
        difficulty = target.dataset.diff;
    });
});

// Set default selected difficulty
document.querySelector('.diff-btn[data-diff="easy"]').classList.add('selected');

// Start Game
document.getElementById('start-btn').addEventListener('click', () => {
    username = document.getElementById('username').value.trim();
    if (!username) return alert("Please enter your Player Name!");
    
    startGame();
});

function shuffleArray(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function startGame() {
    score = 0;
    currentQuestionIndex = 0;
    userAnswers = [];
    quizSequence = shuffleArray(artworksData).slice(0, 10);
    
    const extraContainer = document.getElementById('extra-questions-container');
    const centuryContainer = document.getElementById('century-question');
    
    if (difficulty === 'easy') {
        extraContainer.style.display = 'none';
    } else if (difficulty === 'medium') {
        extraContainer.style.display = 'block';
        centuryContainer.style.display = 'none';
    } else if (difficulty === 'hard') {
        extraContainer.style.display = 'block';
        centuryContainer.style.display = 'block';
    }

    showScreen('quiz-screen');
    loadQuestion();
}

function generateOptions(correctOption, fullPool, count) {
    let distractors = fullPool.filter(o => o !== correctOption);
    distractors = shuffleArray(distractors).slice(0, count - 1);
    return shuffleArray([...distractors, correctOption]);
}

function loadQuestion() {
    selectedImage = null;
    selectedArtist = null;
    selectedCentury = null;

    const currentArt = quizSequence[currentQuestionIndex];
    document.getElementById('progress-text').innerText = `Exercise ${currentQuestionIndex + 1} / 10`;

    // Setup 4 Images
    const basePath = `artworks/${currentArt.id}/${currentArt.id}`;
    let images = [
        { path: `${basePath}.jpg`, isReal: true },
        { path: `${basePath}1.jpg`, isReal: false },
        { path: `${basePath}2.jpg`, isReal: false },
        { path: `${basePath}3.jpg`, isReal: false }
    ];
    images = shuffleArray(images);

    const grid = document.getElementById('image-grid');
    grid.innerHTML = "";
    images.forEach(imgObj => {
        const img = document.createElement('img');
        img.src = imgObj.path;
        img.className = 'art-image';
        img.onerror = () => { img.src = 'https://via.placeholder.com/300x300?text=Artwork+Image'; };
        img.onclick = () => {
            document.querySelectorAll('.art-image').forEach(el => el.classList.remove('selected'));
            img.classList.add('selected');
            selectedImage = imgObj;
        };
        grid.appendChild(img);
    });

    // Medium/Hard Questions
    if (difficulty === 'medium' || difficulty === 'hard') {
        const artistOpts = generateOptions(currentArt.artist, allArtists, 4);
        const artistGrid = document.getElementById('artist-options');
        artistGrid.innerHTML = "";
        artistOpts.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt;
            btn.onclick = () => {
                document.querySelectorAll('#artist-options .option-btn').forEach(el => el.classList.remove('selected'));
                btn.classList.add('selected');
                selectedArtist = opt;
            };
            artistGrid.appendChild(btn);
        });
    }

    if (difficulty === 'hard') {
        const centuryOpts = generateOptions(currentArt.century, allCenturies, 4);
        const centuryGrid = document.getElementById('century-options');
        centuryGrid.innerHTML = "";
        centuryOpts.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt;
            btn.onclick = () => {
                document.querySelectorAll('#century-options .option-btn').forEach(el => el.classList.remove('selected'));
                btn.classList.add('selected');
                selectedCentury = opt;
            };
            centuryGrid.appendChild(btn);
        });
    }
}

// Answer Submission
document.getElementById('submit-answer-btn').addEventListener('click', () => {
    if (!selectedImage) return alert("Please select which image you think is the original!");
    if ((difficulty === 'medium' || difficulty === 'hard') && !selectedArtist) return alert("Please select an artist!");
    if (difficulty === 'hard' && !selectedCentury) return alert("Please select a century!");

    const currentArt = quizSequence[currentQuestionIndex];
    let roundPoints = 0;

    if (difficulty === 'easy') {
        if (selectedImage.isReal) roundPoints = 10;
    } else if (difficulty === 'medium') {
        if (selectedImage.isReal) roundPoints += 5;
        if (selectedArtist === currentArt.artist) roundPoints += 5;
    } else if (difficulty === 'hard') {
        if (selectedImage.isReal) roundPoints += 10 / 3;
        if (selectedArtist === currentArt.artist) roundPoints += 10 / 3;
        if (selectedCentury === currentArt.century) roundPoints += 10 / 3;
    }

    score += roundPoints;

    userAnswers.push({
        artwork: currentArt,
        selectedImgPath: selectedImage.path,
        selectedArtist: selectedArtist,
        selectedCentury: selectedCentury
    });

    currentQuestionIndex++;
    if (currentQuestionIndex < quizSequence.length) {
        loadQuestion();
    } else {
        endGame();
    }
});

function endGame() {
    showScreen('results-screen');
    
    let finalScoreDisplay = score.toFixed(2);
    if (Math.round(score) === 100 || finalScoreDisplay.endsWith(".00")) {
        finalScoreDisplay = Math.round(score).toString();
    }

    document.getElementById('final-score').innerText = `Your Final Score: ${finalScoreDisplay} / 100`;

    // Save to dynamic LocalStorage Leaderboard
    saveToLeaderboard(username, parseFloat(finalScoreDisplay), difficulty);

    // Render Side-by-Side Comparison
    const container = document.getElementById('comparison-container');
    container.innerHTML = "";

    userAnswers.forEach((ans) => {
        const art = ans.artwork;
        const realImgPath = `artworks/${art.id}/${art.id}.jpg`;

        container.innerHTML += `
            <div class="comparison-row">
                <div class="comparison-box">
                    <h4>Your Guess</h4>
                    <img src="${ans.selectedImgPath}" alt="Your guess">
                    ${difficulty !== 'easy' ? `<p>Artist: <strong style="color:${ans.selectedArtist === art.artist ? '#16a34a':'#dc2626'}">${ans.selectedArtist || 'N/A'}</strong></p>` : ''}
                    ${difficulty === 'hard' ? `<p>Century: <strong style="color:${ans.selectedCentury === art.century ? '#16a34a':'#dc2626'}">${ans.selectedCentury || 'N/A'}</strong></p>` : ''}
                </div>
                <div class="comparison-box">
                    <h4>Original Masterpiece</h4>
                    <img src="${realImgPath}" alt="Original">
                    ${difficulty !== 'easy' ? `<p>Artist: <strong>${art.artist}</strong></p>` : ''}
                    ${difficulty === 'hard' ? `<p>Century: <strong>${art.century}</strong></p>` : ''}
                    <button class="info-btn" onclick="openModal('${art.id}')">Discover Artwork</button>
                </div>
            </div>
        `;
    });
}

// --- DYNAMIC LEADERBOARD LOGIC ---
function saveToLeaderboard(name, userScore, diff) {
    const key = `leaderboard_${diff}`;
    let leaderboard = JSON.parse(localStorage.getItem(key)) || [];
    
    leaderboard.push({ name: name, score: userScore, date: new Date().toLocaleDateString() });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10); // Keep top 10

    localStorage.setItem(key, JSON.stringify(leaderboard));
    loadLeaderboardDisplay(diff);
}

function switchLeaderboardTab(diff, btnElement) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
    loadLeaderboardDisplay(diff);
}

function loadLeaderboardDisplay(diff) {
    const key = `leaderboard_${diff}`;
    const leaderboard = JSON.parse(localStorage.getItem(key)) || [];
    const listElement = document.getElementById('leaderboard-list');
    listElement.innerHTML = "";

    if (leaderboard.length === 0) {
        listElement.innerHTML = `<li class="empty-msg">No high scores yet for ${diff.toUpperCase()}. Play first!</li>`;
        return;
    }

    leaderboard.forEach((entry, idx) => {
        listElement.innerHTML += `
            <li>
                <span class="rank">${idx + 1}.</span>
                <span class="name">${entry.name}</span>
                <span class="score">${entry.score} pts</span>
            </li>
        `;
    });
}

// --- MODAL LOGIC ---
function openModal(artId) {
    const art = artworksData.find(a => a.id === artId);
    if (!art) return;

    document.getElementById('modal-artist').innerText = art.artist;
    document.getElementById('modal-year').innerText = art.year;
    document.getElementById('modal-century').innerText = art.century;
    document.getElementById('modal-desc').innerText = art.info;
    
    document.getElementById('info-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('info-modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('info-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};