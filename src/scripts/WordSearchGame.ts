import { MatrixGenerator } from './MatrixGenerator.js';
import { UIManager } from './UIManager.js';

export class WordSearchGame {
    private readonly GRID_SIZE_X: number;
    private readonly GRID_SIZE_Y: number;
    private readonly words: string[];
    private uiManager: UIManager;
    private matrixGenerator: MatrixGenerator;
    private matrix: string[][];
    private wordsInPuzzle: string[];
    private foundWords: string[];
    private selection: [number, number][];
    private isSelecting: boolean;
    private selectionDirection: [number, number] | null;

    constructor(gridSizeX: number, gridSizeY: number, words: string[], uiManager: UIManager) {
        this.GRID_SIZE_X = gridSizeX;
        this.GRID_SIZE_Y = gridSizeY;
        this.words = words;
        this.uiManager = uiManager;
        this.matrixGenerator = new MatrixGenerator(gridSizeX, gridSizeY, words);
        this.matrix = [];
        this.wordsInPuzzle = [];
        this.foundWords = [];
        this.selection = [];
        this.isSelecting = false;
        this.selectionDirection = null;
    }

    initialize(): void {
        const { matrix, placedWords } = this.matrixGenerator.generate();
        this.matrix = matrix;
        this.wordsInPuzzle = this.shuffleArray(placedWords);
        this.uiManager.renderBoard(this.matrix);
        this.uiManager.renderWordList(this.wordsInPuzzle, this.foundWords);
        this.setupEventListeners();
    }

    private shuffleArray(array: string[]): string[] {
        const shuffled = array.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    private setupEventListeners(): void {
        const gameBoard = document.getElementById('game-board');
        if (!gameBoard) return;

        let isMouseDown = false;
        let isTouching = false;

        console.log('Setting up event listeners');

        gameBoard.addEventListener('mousedown', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('letter')) {
                isMouseDown = true;
                this.handleSelectionStart(parseInt(target.dataset.row!), parseInt(target.dataset.col!));
            }
        });

        gameBoard.addEventListener('mouseover', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (isMouseDown && target.classList.contains('letter')) {
                this.handleSelectionMove(parseInt(target.dataset.row!), parseInt(target.dataset.col!));
            }
        });

        gameBoard.addEventListener('mouseup', () => {
            if (isMouseDown) {
                isMouseDown = false;
                this.handleSelectionEnd();
            }
        });

        gameBoard.addEventListener('mouseleave', () => {
            if (isMouseDown) {
                isMouseDown = false;
                this.handleSelectionEnd();
            }
        });

        gameBoard.addEventListener('touchstart', (e: TouchEvent) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('letter')) {
                e.preventDefault();
                isTouching = true;
                this.handleSelectionStart(parseInt(target.dataset.row!), parseInt(target.dataset.col!));
            }
        }, { passive: false });

        gameBoard.addEventListener('touchmove', (e: TouchEvent) => {
            if (isTouching) {
                e.preventDefault();
                const touch = e.touches[0];
                const element = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
                if (element && element.classList.contains('letter')) {
                    this.handleSelectionMove(parseInt(element.dataset.row!), parseInt(element.dataset.col!));
                }
            }
        }, { passive: false });

        gameBoard.addEventListener('touchend', (e: TouchEvent) => {
            if (isTouching) {
                e.preventDefault();
                isTouching = false;
                this.handleSelectionEnd();
            }
        }, { passive: false });

        const continueButton = document.getElementById('continue-button');
        if (continueButton) {
            continueButton.addEventListener('click', () => this.resetGame());
        }
    }

    private handleSelectionStart(row: number, col: number): void {
        this.isSelecting = true;
        this.selection = [[row, col]];
        this.selectionDirection = null;
        this.uiManager.updateSelectionVisual(this.selection);
    }

    private handleSelectionMove(row: number, col: number): void {
        if (this.isSelecting) {
            const [startRow, startCol] = this.selection[0];
            
            if (this.isValidSelection(startRow, startCol, row, col)) {
                const dirRow = Math.sign(row - startRow);
                const dirCol = Math.sign(col - startCol);

                const newSelection: [number, number][] = [];
                let currentRow = startRow;
                let currentCol = startCol;

                while (currentRow !== row || currentCol !== col) {
                    newSelection.push([currentRow, currentCol]);
                    currentRow += dirRow;
                    currentCol += dirCol;
                }
                newSelection.push([row, col]);

                this.selection = newSelection;
                this.selectionDirection = [dirRow, dirCol];
                this.uiManager.updateSelectionVisual(this.selection);
            }
        }
    }

    private isValidSelection(startRow: number, startCol: number, endRow: number, endCol: number): boolean {
        // Check if it's in the same row, column, or diagonal
        return startRow === endRow || // Same row
               startCol === endCol || // Same column
               Math.abs(endRow - startRow) === Math.abs(endCol - startCol); // Diagonal
    }

    private handleSelectionEnd(): void {
        if (this.isSelecting) {
            const wordFound = this.checkWord();
            if (wordFound) {
                this.uiManager.renderWordList(this.wordsInPuzzle, this.foundWords);
                this.checkGameCompletion();
            }
            this.isSelecting = false;
            this.selection = [];
            this.selectionDirection = null;
            this.uiManager.updateSelectionVisual(this.selection);
        }
    }

    private checkWord(): boolean {
        const selectedWord = this.selection.map(([row, col]) => this.matrix[row][col]).join('');
        const reversedWord = selectedWord.split('').reverse().join('');
        
        const foundWord = this.wordsInPuzzle.find(word => word === selectedWord || word === reversedWord);
        
        if (foundWord && this.foundWords.indexOf(foundWord) === -1) {
            this.foundWords.push(foundWord);
            this.uiManager.markFoundWord(this.selection);
            return true;
        }
        return false;
    }

    private checkGameCompletion(): void {
        if (this.foundWords.length === this.wordsInPuzzle.length) {
            this.uiManager.showCongratulationsScreen();
        }
    }

    resetGame(): void {
        const { matrix, placedWords } = this.matrixGenerator.generate();
        this.matrix = matrix;
        this.wordsInPuzzle = this.shuffleArray(placedWords);
        this.foundWords = [];
        this.uiManager.renderBoard(this.matrix);
        this.uiManager.renderWordList(this.wordsInPuzzle, this.foundWords);
        this.uiManager.hideCongratulationsScreen();
    }
}