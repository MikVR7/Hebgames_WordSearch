type Direction = [number, number];

export class MatrixGenerator {
    private readonly GRID_SIZE_X: number;
    private readonly GRID_SIZE_Y: number;
    private readonly DIRECTIONS: Direction[] = [
        [0, 1], [1, 0], [1, 1], [-1, 1],
        [0, -1], [-1, 0], [-1, -1], [1, -1]
    ];
    private readonly words: string[];
    private readonly MAX_ATTEMPTS = 100;  // Maximum attempts to place a word

    constructor(gridSizeX: number, gridSizeY: number, words: string[]) {
        this.GRID_SIZE_X = gridSizeX;
        this.GRID_SIZE_Y = gridSizeY;
        this.words = this.filterWords(words);
    }

    private filterWords(words: string[]): string[] {
        const maxLength = Math.max(this.GRID_SIZE_X, this.GRID_SIZE_Y);
        return words.filter(word => word.length <= maxLength);
    }

    generate(): { matrix: string[][], placedWords: string[] } {
        let matrix: string[][] = Array(this.GRID_SIZE_Y).fill(null).map(() => Array(this.GRID_SIZE_X).fill(''));
        const placedWords: string[] = [];

        for (const word of this.words) {
            if (this.placeWord(word, matrix)) {
                placedWords.push(word);
            }
        }

        this.fillEmptyCells(matrix);
        return { matrix, placedWords };
    }

    private placeWord(word: string, matrix: string[][]): boolean {
        let attempts = 0;
        while (attempts < this.MAX_ATTEMPTS) {
            const direction = this.DIRECTIONS[Math.floor(Math.random() * this.DIRECTIONS.length)];
            const startRow = Math.floor(Math.random() * this.GRID_SIZE_Y);
            const startCol = Math.floor(Math.random() * this.GRID_SIZE_X);

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
            if (row < 0 || row >= this.GRID_SIZE_Y || col < 0 || col >= this.GRID_SIZE_X) {
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
        for (let i = 0; i < this.GRID_SIZE_Y; i++) {
            for (let j = 0; j < this.GRID_SIZE_X; j++) {
                if (matrix[i][j] === '') {
                    matrix[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                }
            }
        }
    }
}