import { MatrixGenerator } from './MatrixGenerator.js';
import { UIManager } from './UIManager.js';
import { DataEntry } from './Data_WordSearch.js';
import { dataEntries } from './Data_WordSearch.js';
declare const Tools: any;
declare const Randomizer: any;

export default class Game {
    private uiManager: UIManager;
    private matrixGenerator: MatrixGenerator;
    private paramText: string;
    private dataEntries: { [key: string]: DataEntry } = dataEntries;
    private currentDataEntry!: DataEntry;
    
    private matrix: string[][] = [];
    private wordsInPuzzle: string[] = [];
    private foundWords: string[] = [];
    private selection: [number, number][] = [];
    private isSelecting: boolean = false;
    private selectionDirection: [number, number] | null = null;

    constructor() {
        
        const gameBoard = document.getElementById('game-board') as HTMLElement;
        const wordsToFindElement = document.getElementById('words-to-find') as HTMLElement;
        const congratulationsScreen = document.getElementById('congratulations-content') as HTMLElement;
        const headerElement = document.querySelector('header h1') as HTMLElement;
        this.uiManager = new UIManager(gameBoard, wordsToFindElement, congratulationsScreen);
        this.matrixGenerator = new MatrixGenerator();
        
        this.paramText = Tools.GetQueryParam('v');
        if(!this.paramText) {
            this.paramText = 'test';
        }
        if (this.dataEntries[this.paramText]) {
            this.currentDataEntry = this.dataEntries[this.paramText];
        } 

        // Set the header text
        headerElement.textContent = this.currentDataEntry.header;
    }

    public start(): void {
        // Transform wordPool to uppercase
        const upperCaseWordPool = this.currentDataEntry.wordPool.map(word => word.toUpperCase());
    
        // Select only maxWords amount of words randomly
        const selectedWords = Randomizer.PickRandomElements(upperCaseWordPool, this.currentDataEntry.maxWords);
    
        const { matrix, placedWords } = this.matrixGenerator.generate(
            [this.currentDataEntry.matrixSizeWidth, this.currentDataEntry.matrixSizeHeight],
            selectedWords
        );
        this.matrix = matrix;
        this.foundWords = [];
        this.wordsInPuzzle = this.shuffleArray(placedWords);
        this.uiManager.renderBoard(this.matrix);
        this.uiManager.renderWordList(this.wordsInPuzzle, this.foundWords);
        this.setupEventListeners();
        this.uiManager.hideCongratulationsScreen();
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

        const continueButton = document.getElementById('restart-button');
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
        this.start();
    }
}