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
	"mammut": new DataEntry(
        "Das Mammut",
        10,
        15,
        ["mammut", "speer", "schnee", "elefant", "haarig", "fell", "jagd", "jaeger", "kampf", "gruppe", "kaelte", "gross", "stark", "pelzig", "ausgestorben", "eiszeit", "knochen", "skelett", "wolle", "jagd", "herde", "steppe", "hoehle", "mammutjagd", "elfenbein", "museum", "ausstellung", "dna", "grasland", "fell", "ohr", "auge", "bein", "fleisch", "haut", "wildtier", "pflanzenfresser", "urzeit", "gigantisch", "kolossal", "gewaltig", "massiv", "urmensch", "steinzeit", "eiszeitalter", ],
        15
	
    ),
	
	
	
	
	
	"asz": new DataEntry(
        "Altsteinzeit",
        10,
        15,
        [ "urzeit", "sammler", "feuer", "mammut", "speer", "axt", "nomade", "clan", "tier", "fell", "jagd", "beute", "fisch", "pfeil", "bogen", "kalt", "eis", "schnee", "klima", "wandel", "beere", "pflanze", "fleisch", "knochen", "horn", "zahn", "kunst", "ritual", "schmuck", "lager", "zelt", "sippe", "tier", "holz", "stein", "keule", "steppe", "wasser", "waffe" ],
        15
    ),
	
	
	"jsz": new DataEntry(
        "Jungsteinzeit",
        10,
        15,
        [ "sesshaft", "haus", "hund", "schaf", "acker", "axt", "bauer", "dorf", "ernte", "feuer", "grab", "herde", "jagd", "korn", "leinen", "ochse", "pflug", "rad", "saat", "sichel", "sippe", "speer", "stein", "tier", "topf", "pferd", "weizen", "hafer", "roggen", "messer", "scharf", "klinge", "dorf", "winter", "sommer", "pflug", "holz", "baum", "wald" ],
        15
    ),
	
	
};