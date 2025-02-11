// Cards

let deck;
let cards;

let cardsDivs;

function generateFaceUpCardElement(card) {
    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card-face-up-div");
    cardDiv.appendChild(document.createElement("div"));
    cardDiv.firstChild.setAttribute("class", "card-face-div");
    cardDiv.firstChild.style.color = colors[card.suit];
    cardDiv.firstChild.innerHTML = symbols[card.suit] + card.rank;
    return cardDiv;
}

function generateFaceDownCardElement() {
    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card-face-down-div");
    cardDiv.appendChild(document.createElement("div"));
    cardDiv.firstChild.setAttribute("class", "card-logo-div")
    cardDiv.firstChild.innerHTML = "BJ";
    return cardDiv;
}

function placeCard(div, card) {
    cardsDivs[div].appendChild(generateFaceUpCardElement(card));
}

function placeCardFaceDown(div) {
    cardsDivs[div].appendChild(generateFaceDownCardElement());
}

function cleanUpCards() {
    for (let div of cardsDivs) div.innerHTML = "";
}

// Scores

let scoreSpans;

function displayScore(span, score) {
    scoreSpans[span].innerHTML = score;
}

function updateScore(span) {
    scoreSpans[span].innerHTML = computeScore(cards[span]);
}

function updateScores() {
    for (let span in scoreSpans) scoreSpans[span].innerHTML = computeScore(cards[span]);
}

function resetScores() {
    for (let span of scoreSpans) span.innerHTML = "0";
}

function clearScores() {
    for (let span of scoreSpans) span.innerHTML = "";
}

// Totals

let totals;
let totalSpans;

function addToTotal(total) {
    if (total !== -1) totalSpans[total].innerHTML = ++totals[total];
}

function updateTotals() {
    for (let span in totalSpans) {
        totalSpans[span].innerHTML = totals[span];
    }
}

function resetTotals() {
    for (let span of totalSpans) span.innerHTML = "0";
}

function clearTotals() {
    for (let span of totalSpans) span.innerHTML = "";
}

// Results

let resultsDiv;

function displayResult(winner) {
    if (winner === -1) resultsDiv.innerHTML = "Push!";
    else resultsDiv.innerHTML = ["Dealer", "Player"][winner] + " wins!";
}

function clearResult() {
    resultsDiv.innerHTML = "";
}

// Controls

let controlsDivs;

function openControls(div) {
    for (let i in controlsDivs) {
        if (parseInt(i) === div) controlsDivs[i].style.display = "inline-block";
        else controlsDivs[i].style.display = "none";
    }
}

// Gameplay

function dealCard(i) {
    let card = deck.pop();
    cards[i].push(card);
    placeCard(i, card);
}

function firstDeal() {
    dealCard(1);

    cards[0].push(deck.pop());
    placeCardFaceDown(0);

    dealCard(1);
    dealCard(0);

    updateScore(1);
    displayScore(0, computeScore([cards[0][1]]));

    if (computeScore(cards[1]) === 21) blackjack();
}

function hit() {
    dealCard(1);
    updateScore(1)
    
    let score = computeScore(cards[1]);
    if (score > 21) {
        declareResult(0);
    } else if (score === 21) {
        stand();
    }
}

function stand() {
    cardsDivs[0].firstChild.replaceWith(generateFaceUpCardElement(cards[0][0]));

    let playerScore = computeScore(cards[1]);
    let card;
    while (computeScore(cards[0]) < 17 && computeScore(cards[0]) < playerScore) {
        dealCard(0);
    }
    updateScore(0);

    let dealerScore = computeScore(cards[0])
    if (dealerScore < playerScore || dealerScore > 21) declareResult(1);
    else if (dealerScore === playerScore) {
        if (dealerScore === 21 && cards[0].length === 2) declareResult(0);
        else declareResult(-1);
    } else declareResult(0);
}

function blackjack() {
    cardsDivs[0].firstChild.replaceWith(generateFaceUpCardElement(cards[0][0]));
    updateScore(0);

    if (computeScore(cards[0]) === 21 && cards[0].length === 2) declareResult(0);
    else declareResult(1);
}

function declareResult(winner) {
    displayResult(winner);
    addToTotal(winner);
    openControls(2);
}

function startGame() {
    updateScores();
    updateTotals();
    openControls(1);

    deck = generateShuffledDeck();
    cards = [[], []];

    firstDeal();
}

function restartGame() {
    resetTable();
    clearResult();
    startGame();
}

function resetTable() {
    cleanUpCards();
    resetScores();
}

function clearAll() {
    cleanUpCards();
    clearScores();
    clearResult();
    openControls(0);
    deck = [];
    cards = [[], []];
    totals = [ 0, 0 ];
}

function initialize() {
    cardsDivs = [
        document.getElementById("dealer-cards-div"),
        document.getElementById("player-cards-div")
    ];
    scoreSpans = [
        document.getElementById("dealer-score-span"),
        document.getElementById("player-score-span")
    ];
    totalSpans = [
        document.getElementById("dealer-total-span"),
        document.getElementById("player-total-span")
    ];
    resultsDiv = document.getElementById("results-div");
    controlsDivs = [
        document.getElementById("main-controls-div"),
        document.getElementById("game-controls-div"),
        document.getElementById("replay-controls-div")
    ];
    clearAll();
}