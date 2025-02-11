let suits = [ "C", "D", "H", "S" ];
let ranks = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A" ];
let symbols = { "C": "\u2663", "D": "\u2666", "H": "\u2665", "S": "\u2660" };
let colors = { "C": "#000000", "D": "#ff0000", "H": "#ff0000", "S": "#000000" };

function generateShuffledDeck() {
    let deck = new Array(52);
    for (let s of suits) {
        for (let r of ranks) {
            let index;
            do {
                index = Math.floor(Math.random()*52);
            } while (typeof deck[index] !== "undefined");
            deck[index] = { suit: s, rank: r };
        }
    }
    return deck;
}

let cardValues = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 10,
    "Q": 10,
    "K": 10,
    "A": 1
}

function computeScore(arr) {
    let sum = 0;
    for (let card of arr) sum += cardValues[card.rank];
    for (let card of arr.filter((a) => a.rank === "A")) {
        if (sum + 10 <= 21) sum += 10;
    }
    return sum;
}