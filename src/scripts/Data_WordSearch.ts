export class DataEntry {
    constructor(
        public header: string,
        public matrixSizeWidth: number,
        public matrixSizeHeight: number,
        public wordPool: string[],
        public maxWords: number)
    {
        this.wordPool = wordPool
            .map(word => word.toUpperCase())
            .filter(word => /^[A-Z]+$/.test(word)); // Filter out words with non-English characters
        matrixSizeHeight = Math.min(matrixSizeHeight, 10);
    }
}

export const dataEntries: { [key: string]: DataEntry } = {
    "test": new DataEntry(
        "Header1",
        10,
        15,
        ["apple", "banana", "cherry", "date", "elderberry", "apferl", "bananski", "kirscherl", "datum", "Holunder"],
        6
    ),
};