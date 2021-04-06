let get  = (elementId) => document.getElementById(elementId);

const cardsContainer = get('cards-container');
const prevBtn = get('prev');
const nextBtn = get('next');
const currentEl= get('current');
const showBtn= get('show');
const hideBtn = get('hide');
const questionEl = get('question');
const answerEl = get('answer');
const addCardBtn = get('add-card');
const clearBtn = get('clear');
const addContainer = get('add-container');


// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store cards data
const cardsData = getCardsData();


// Create all cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if(index === 0) {
        // Add the active class to the first card
        card.classList.add('active');
    }

    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        card.classList.toggle('show-answer')
    })

    // Add to the DOM cards
    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`
}

// Get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// Add cards to local storage
function setCardsData(cardsData) {
    localStorage.setItem('cards', JSON.stringify(cardsData));
    window.location.reload();
}

// Event listeners
nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';
    currentActiveCard ++;
    if(currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }
    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
})

prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';
    currentActiveCard --;
    if(currentActiveCard < 0) {
        currentActiveCard = 0;
    }
    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
})

// Show the add container
showBtn.addEventListener('click', () => {
    addContainer.classList.add('show');
})

// Hide the add container
hideBtn.addEventListener('click', () => {
    addContainer.classList.remove('show');
})

addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if(question.trim() && answer.trim()) {
        const newCard = {
            question,
            answer
        };

        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('show');
        cardsData.push(newCard);

        setCardsData(cardsData);
    }
})

// Clear cards
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
})

createCards();
