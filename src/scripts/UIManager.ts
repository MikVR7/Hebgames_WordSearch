export class UIManager {
    private gameBoard: HTMLElement | null;
    private wordsToFindElement: HTMLElement;
    private congratulationsScreen: HTMLElement;

    constructor(gameBoard: HTMLElement | null, wordsToFindElement: HTMLElement, congratulationsScreen: HTMLElement) {
        this.gameBoard = gameBoard;
        this.wordsToFindElement = wordsToFindElement;
        this.congratulationsScreen = congratulationsScreen;
    }

    renderBoard(matrix: string[][]): void {
        if(this.gameBoard === null) return;
        this.gameBoard.innerHTML = '';
        const gridSizeX = matrix[0].length;
        const gridSizeY = matrix.length;
        
        this.gameBoard.style.display = 'grid';
        this.gameBoard.style.gridTemplateColumns = `repeat(${gridSizeX}, 30px)`;
        this.gameBoard.style.gridTemplateRows = `repeat(${gridSizeY}, 30px)`;
        
        matrix.forEach((row, rowIndex) => {
            row.forEach((letter, colIndex) => {
                const letterElement = document.createElement('div');
                letterElement.className = 'letter';
                letterElement.textContent = letter.toUpperCase(); // Transform to uppercase
                letterElement.dataset.row = rowIndex.toString();
                letterElement.dataset.col = colIndex.toString();
                if(this.gameBoard !== null) {
                    this.gameBoard.appendChild(letterElement);
                }
            });
        });
    }
    
    renderWordList(words: string[], foundWords: string[]): void {
        this.wordsToFindElement.innerHTML = words.map(word => 
            `<span class="word ${foundWords.indexOf(word) !== -1 ? 'found' : ''}">${word}</span>`
        ).join('');
    }


    updateSelectionVisual(selection: [number, number][]): void {
        document.querySelectorAll('.letter').forEach(el => {
            el.classList.remove('selected', 'temp-selected');
        });

        selection.forEach(([row, col]) => {
            const element = document.querySelector(`.letter[data-row="${row}"][data-col="${col}"]`);
            if (element) {
                if (element.classList.contains('found')) {
                    element.classList.add('temp-selected');
                } else {
                    element.classList.add('selected');
                }
            }
        });
    }

    markFoundWord(wordCoordinates: [number, number][]): void {
        wordCoordinates.forEach(([row, col]) => {
            const element = document.querySelector(`.letter[data-row="${row}"][data-col="${col}"]`);
            if (element) {
                element.classList.remove('temp-selected', 'selected');
                element.classList.add('found');
            }
        });
    }

    // showCongratulationsScreen(): void {
    //     this.congratulationsScreen.style.display = 'flex';

        public showCongratulationsScreen(): void {
            this.congratulationsScreen.style.display = "flex";
    
        }
    // }

    hideCongratulationsScreen(): void {
        this.congratulationsScreen.style.display = 'none';
    }
}