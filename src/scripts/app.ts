import { UIManager } from './UIManager.js';
import { WordSearchGame } from './WordSearchGame.js';

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

document.addEventListener('DOMContentLoaded', () => {
    const GRID_SIZE_X = 10;  // Width of the grid
    const GRID_SIZE_Y = 12;  // Height of the grid
    const WORDS = ['REACT', 'JAVASCRIPT', 'HTML', 'CSS', 'NODE', 'TYPESCRIPT', 'TONA', 'EDUARDO', 'TOKELE', 'OTTENDORF'];

    const shuffledWords = shuffleArray(WORDS);

    const gameBoard = document.getElementById('game-board');
    const wordsToFindElement = document.getElementById('words-to-find');
    const congratulationsScreen = document.getElementById('congratulations-screen');

    if (gameBoard && wordsToFindElement && congratulationsScreen) {
        const uiManager = new UIManager(gameBoard, wordsToFindElement, congratulationsScreen);
        const game = new WordSearchGame(GRID_SIZE_X, GRID_SIZE_Y, shuffledWords, uiManager);

        game.initialize();
    } else {
        console.error('Required DOM elements not found');
    }
});