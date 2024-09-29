type Direction = [number, number];

export class MatrixGenerator {
    
    private gridSize: [number, number] = [0, 0];
    private readonly DIRECTIONS: Direction[] = [
        [0, 1], [1, 0], [1, 1], [-1, 1],
        [0, -1], [-1, 0], [-1, -1], [1, -1]
    ];
    private words: string[] = [];
    private readonly MAX_ATTEMPTS = 100;  // Maximum attempts to place a word

    constructor() { }

    public generate(gridSize: [number, number], words: string[]): { matrix: string[][], placedWords: string[] } {
        this.gridSize = gridSize;
        this.words = this.filterWords(words);

        let matrix: string[][] = Array(this.gridSize[1]).fill(null).map(() => Array(this.gridSize[0]).fill(''));
        const placedWords: string[] = [];

        for (const word of this.words) {
            if (this.placeWord(word, matrix)) {
                placedWords.push(word);
            }
        }

        this.fillEmptyCells(matrix);
        return { matrix, placedWords };
    }

    private filterWords(words: string[]): string[] {
        const maxLength = Math.max(this.gridSize[0], this.gridSize[1]);
        return words.filter(word => word.length <= maxLength);
    }

    private placeWord(word: string, matrix: string[][]): boolean {
        let attempts = 0;
        while (attempts < this.MAX_ATTEMPTS) {
            const direction = this.DIRECTIONS[Math.floor(Math.random() * this.DIRECTIONS.length)];
            const startRow = Math.floor(Math.random() * this.gridSize[1]);
            const startCol = Math.floor(Math.random() * this.gridSize[0]);

            if (this.canPlaceWord(word, startRow, startCol, direction, matrix)) {
                this.placeWordInMatrix(word, startRow, startCol, direction, matrix);
                return true;
            }
            attempts++;
        }
        console.warn(`Could not place word: ${word}`);
        return false;
    }

    private canPlaceWord(word: string, startRow: number, startCol: number, direction: Direction, matrix: string[][]): boolean {
        for (let i = 0; i < word.length; i++) {
            const row = startRow + i * direction[0];
            const col = startCol + i * direction[1];
            if (row < 0 || row >= this.gridSize[1] || col < 0 || col >= this.gridSize[0]) {
                return false;
            }
            if (matrix[row][col] !== '' && matrix[row][col] !== word[i]) {
                return false;
            }
        }
        return true;
    }

    private placeWordInMatrix(word: string, startRow: number, startCol: number, direction: Direction, matrix: string[][]): void {
        for (let i = 0; i < word.length; i++) {
            const row = startRow + i * direction[0];
            const col = startCol + i * direction[1];
            matrix[row][col] = word[i];
        }
    }

    private fillEmptyCells(matrix: string[][]): void {
        for (let i = 0; i < this.gridSize[1]; i++) {
            for (let j = 0; j < this.gridSize[0]; j++) {
                if (matrix[i][j] === '') {
                    matrix[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                }
            }
        }
    }
}