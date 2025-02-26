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
	
	"halloween": new DataEntry(
        "Halloween",
        10,
        15,
        [ "apfel", "hexe", "geist", "spuk", "grusel", "maske", "zucker", "saures", "skelett", "vampir", "mumie", "spinne", "nebel", "dunkel", "kerze", "friedhof", "mond", "eule", "katze", "rabe", "herbst", "angst", "ritual", "fluch", "monster", "zauber", "nacht", "mythos", "kobold", "falle", "gruseln", "heulen", "party", "knochen", "axt", "magie", "masken", "narben", "furcht", "besen", "schatten", "kapuze", "vogel", "ast", "licht", "kerzen", "laterne", "feuer", "umzug", "verkleiden", "kinder", "usa", "brauch", "amerika", "irland", "glaube", "lachen" ],
        15
    ),
	
	"nationalfeiertag": new DataEntry(
        "Nationalfeiertag",
        10,
        15,
        [ "berge", "luft", "haus", "alpen", "see", "wiese", "wien", "graz", "linz", "donau", "ski", "schnee", "walzer", "tanz", "musik", "wein", "bier", "kaffee", "strudel", "schnitzel", "dirndl", "tracht", "hut", "adler", "kuh", "ziege", "burg", "schloss", "kirche", "mozart", "kunst", "theater", "tirol", "salzburg", "jodeln", "alm", "enzian", "sisi", "kaiser", "krone", "holz", "leder", "apfel", "birne", "marille", "sacher", "torte", "kipferl", "fiaker", "oper", "ball", "punsch", "janker", "gemse", "hirsch", "fuchs", "tafel", "schule", "maler", "dichter", "film", "rodeln", "wandern", "lipizzaner", "pferd", "reiten", "mur", "inn", "enns", "hofburg", "prater", "ring", "sissi", "franz", "joseph", "erzherzog", "herzog", "graf" ],
        15
    ),
	
	
	"martinigansl": new DataEntry(
        "Laternenfest und Martini",
        10,
        15,
        [ "laterne", "licht", "martin", "pferd", "gans", "umzug", "lieder", "herbst", "mantel", "bischof", "heiliger", "heilig", "teilung", "gnade", "fackel", "kind", "singen", "freude", "dunkelheit", "feuer", "dorf", "kirche", "legende", "fest", "essen", "kastanie", "ernte", "freundschaft", "armut", "teilen", "helfen", "dankbarkeit", "winter", "herz", "liebe", "feld", "geschichte", "ritter", "soldat", "wohlfahrt", "glauben", "pastete", "feier", "schmaus", "bauern", "hof", "kraut", "rotkraut", "tradition", "heu", "strahlen", "stall", "winterbeginn", "legende", "feder", "schnabel", "backen", "glocken", "tracht", "hut", "messe", "segen", "sterne", "umzug", "zug", "fahne", "lichtspiel", "lichtstrahl", "stern", "engel", "singen", "lieder", "hand", "leuchten", "eltern", "basteln", "vorfreude" ],
        15
    ),
	
	"ts_textinterpretation": new DataEntry(
        "Rhetorische Stilmittel und mehr",
        10,
        10,
        ["metapher", "vergleich", "personifikation", "alliteration", "anapher", "hyperbel", "antithese", "ironisch", "klimax", "oxymoron", "parallelismus", "pleonasmus", "rhetorische_frage", "synekdoche", "chiasmus", "ellipse", "euphemismus", "litotes", "paradoxon", "allegorie", "drama", "epik", "lyrik", "figuren", "monolog", "dialog", "ironie", "sprache", "absatz", "titel", "sachlich", "subjektiv", "zeit", "tempus", "satz", "syntax"],
        15
    ),

    "ts_eroerterung": new DataEntry(
        "Wortliste zur Erörterung",
        10,
        10,
        ["argument", "these", "beispiel", "pro", "kontra", "schlussfolgerung", "einleitung", "hauptteil", "schlussteil", "position", "behauptung", "meinung", "gegenargument", "widerlegung", "analyse", "thema", "frage", "logik", "struktur", "input", "text", "titel", "frage", "zitat", "studie", "experte", "objektiv", "fazit", "stil" ],
        15
    ),

    "luther": new DataEntry(
        "Wortliste zu Martin Luther und der Reformation",
        10,
        10,
        ["luther", "thesen", "papst", "glaube", "kirche", "bibel", "gottes", "reform", "kreuz", "priester", "kloster", "ablass", "fehde", "frieden", "fürst", "mönch", "krieg", "jesuit", "adel", "hymne", "gott", "ritus", "fromm", "recht", "rat", "ehre", "wille", "latein"," trient", "konzil", "glaube", "zwang", "dom", "himmel", "engel", "teufel", "gut", "schlecht", "tapfer", "flucht", "burg", "herr", "adel", "bann", "reich"],
        15
    ),


    "maerchen": new DataEntry(
        "Wortliste zu Märchen",
        10,
        10,
        ["fee", "könig", "drache", "prinz", "hexe", "schloss", "wald", "magie", "fluch", "zauber", "ritter", "prinzessin", "zwerg", "edel", "schwert", "frosch", "riese", "list", "kutsche", "spiegel", "königin", "traum", "krone", "thron", "geist", "rabe", "schnee", "wolf", "gold", "stern", "flügel", "ross", "apfel", "kräuter", "wunsch", "rose", "dorn", "hut", "nacht", "turm"],
        15
    ), 
	
	"allerheiligen": new DataEntry(
    "Allerheiligen und Allerseelen",
    10,
    15,
    ["heilig", "gedenken", "kerze", "grab", "friedhof", "seele", "gebet", "ruhe", "blumen", "engel", "engel", "kreuz", "weihrauch", "andacht", "tradition", "november", "frieden", "ewigkeit", "heilige", "kirche", "lichtermeer", "grablicht", "messe", "kranz", "familie", "stille", "trauer", "hoffnung", "glaube", "segen", "striezel", "zopf", "backen", "erinnerung", "beten", "pfarrer", "segnung", "wasser", "violett", "rosa", "lila", "jenseits", "himmel", "feuer", "fegefeuer", "almosen", "spenden", "arm", "reich", "schuld", "hilfe", "helfen", "heilige", "heiliger", "papst", "glaube", "glauben", "zeit", "harmonie"],
    15
),

"advent": new DataEntry(
    "Adventzeit",
    10,
    15,
    ["advent", "kerze", "kranz", "stern", "kekse", "zimt", "vanille", "backzeit", "engel", "hirte", "krippe", "stroh", "maria", "josef", "stall", "ochs", "esel", "bethlehem", "gold", "weihrauch", "myrrhe", "lieder", "singen", "freude", "warten", "dezember", "schnee", "winter", "tannenbaum", "zweig", "mandeln", "nuss", "honig", "marzipan", "lebkuchen", "nikolaus", "apfel", "orange", "nelken", "zimtstern", "stille", "frieden", "punsch", "fenster", "kalender", "licht", "hoffnung", "lila", "rosa", "weihe", "krippenspiel", "kirche", "pfarrer", "gottesdienst", "christus", "kranz", "zweige", "barbara", "glueck", "segen", "andacht", "gebet", "ruhe", "markt", "familie", "feier", "licht", "feuer", "singen", "lieder", "segen", "spenden", "hilfe", "frieden"],
    15
),

    "metallzeiten": new DataEntry(
        "Metallzeiten, Ötzi und Kelten",
        10,
        15,
        [
            "bronze", "eisen", "kupfer", "zinn", "schwert", "schmied", 
            "metall", "oetzi", "gletsche", "mumie", "beil", "pfeil",
            "bogen", "dolch", "fell", "schuhe", "heu", "tattoo", 
            "heilung", "kraeuter", "handel", "salz", "gold", "hallstatt",
            "noricum", "kelten", "stamm", "fuerst", "grab", "hoehle",
            "schmuck", "bernstein", "waffen", "werkzeug", "schild",
            "latene", "krieger", "haendler", "siedlung",
            "huegel", "mauer", "stahl", "erz", "bergwerk",
            "schmiede", "kunst", "spirale", "kette"
        ],
        15
    ),
    
    "herbstgemuese": new DataEntry(
    "Winter- und Herbstgemüse in Österreich",
    10,
    15,
    ["weisskraut", "rotkraut", "wirsingkohl", "gruenkohl", "chinakohl", "kohlrabi", "rosenkohl", "brokkoli", "blumenkohl", "spitzkohl", "karotte", "pastinake", "schwarzwurzel", "sellerie", "knollensellerie", "stangensellerie", "petersilienwurzel", "meerrettich", "topinambur", "steckruebe", "haferwurzel", "zuckerwurzel", "erdapfel", "kartoffel", "porree", "lauch", "zwiebel", "schalotte", "knoblauch", "feldsalat", "endivie", "chicoree", "radicchio", "mangold", "apfel", "birne", "quitte", "speierling", "mispel", "hagebutte", "schlehe", "holunder", "berberitze", "kornelkirsche", "weissdorn", "aronia", "felsenbirne", "sanddorn", "vogelbeere", "walnuss", "haselnuss", "kastanie", "maroni", "edelkastanie"],
    15
),


"ludwig": new DataEntry(
    "Ludwig XIV. und Versailles",
    10,
    15,
    [
        // Personen und Titel
        "sonnenkoenig", "ludwig", "mazarin", "colbert", 
        "adel", "adelige", "hofstaat", "minister", "diener", "gaertner",
        "herrscher", "volk",
        
        // Schloss und Architektur
        "spiegelsaal", "schloss", "kapelle", "appartement",
        "versailles", "garten", "park", "brunnen", "statuen",
        "marmor", "gold", "spiegel", "decke", "treppe",
        "balkon", "blumen",
        
        // Höfisches Leben
        "etikette", "zeremonie", "ballet", "musik", "theater",
        "fest", "jagd", "lever", "audienz", "menuett",
        "tanz", "tanzen", "spiele", "party", "essen",
        "tafel", "kerzen", "kerzenlicht",
        
        // Politik und Macht
        "absolutismus", "macht", "staat", "politik", "monarch",
        "regiment", "armee", "krieg", "frieden", "diplomat",
        "reichtum", "geld", "arm", "armut",
        
        // Kultur und Kunst
        "barock", "kunst", "malerei", "skulptur", "musik",
        "bibliothek", "architektur", "gaerten", "mode", "perucke"
    ],
    15
), 

"nikolaus": new DataEntry(
    "Nikolaus und Krampus",
    10,
    15,
    [
        "nikolaus", "krampus", "bischof", "heiliger", "gaben", "geschenk", 
        "sack", "rute", "apfel", "nuss", "mandel", "kette", "maske", 
        "pelz", "glocke", "teufel", "brauch", "dezember", "advent", 
        "stiefel", "pass", "gold", "stroh", "mitra", "stab", "engel", 
        "helfer", "segen", "brauchtum", "winter"
    ],
    15
),
"jufa": new DataEntry(
    "Jufaversum",
    10,
    10,
    [
         "jufaversum",
    ],
    1
),


    "bewerbung": new DataEntry(
        "Bewerbung und Berufswelt",
        10,
        15,
        [
            // Bewerbungsunterlagen
            "lebenslauf", "zeugnis", "foto", "anschreiben", "mappe",
            "referenz", "unterschrift", "motivation", "zertifikat",
            
            // Bewerbungsprozess
            "vorstellung", "interview", "meeting", "einladung", "termin",
            "gespräch", "zusage", "absage", "vertrag", "probezeit",
            
            // Qualifikationen
            "ausbildung", "studium", "praktikum", "erfahrung", "sprachen",
            "kenntnisse", "softskills", "teamwork", "kompetenz",
            
            // Berufe
            "arzt", "lehrer", "anwalt", "koch", "tischler",
            "mechaniker", "informatiker", "kaufmann", "elektriker", "maler",
            "baecker", "florist", "polizist", "buchhalter", "apotheker",
            "designer", "architekt", "journalist", "pilot", "friseur",
            
            // Allgemeine Begriffe
            "beruf", "karriere", "erfolg", "arbeit", "firma",
            "position", "gehalt", "chance", "zukunft", "branche",
            "fortbildung"
        ],
        15
    ),
  "quellen": new DataEntry(
    "Quellen der Geschichte",
    10,
    15,
    [
        // Materielle Quellen
        "schwert", "tonscherbe", "muenze", "schmuck", "werkzeug",
        "siegel", "knochen", "waffen", "runen", "grabstein",
        
        // Schriftliche Quellen
        "urkunde", "chronik", "brief", "tagebuch", "vertrag",
        "zeitung", "gesetz", "bibel", "gedicht", "testament",
        
        // Mündliche Überlieferungen
        "maerchen", "sage", "legende", "lied", "mythos",
        "epos", "ballade", "gebet", "spruch", "reim",
        
        // Bildliche Quellen
        "gemaelde", "fresko", "relief", "statue", "wappen",
        "karte", "foto", "plakat", "film", "poster",

        // Orte und Institutionen
        "archiv", "museum", "kirche", "burg", "kloster"
    ],
    15
),

"aegypten": new DataEntry(
    "Das alte Ägypten",
    10,
    15,
    ["anubis", "osiris", "isis", "ra", "sphinx", "pharao", "pyramide", "mumie", "sarkophag", "hieroglyphe", "papyrus", "tempel", "grab", "totenbuch", "priester", "mumifizierung", "tutanchamun", "cheops", "sphinx", "nil", "obelisk", "nekropole", "gott", "katze", "ibis", "horus", "thot", "luxor", "ramses", "amun", "nofretete", "delta", "theben", "kartusche", "balsamierung", "alabaster", "amulett", "uschebti", "maat"],
    15
),


"oed": new DataEntry(
    "Dorf und Dorfgemeinschaft",
    10,
    15,
    [
        // Dorfstruktur und Gebäude
        "kapelle", "kirche", "glocke", "dorfhaus", "dorfplatz",
        "gasthaus", "brunnen", "bus", "bushaltestelle",

        // Gemeinschaft und Soziales
        "verein", "zusammenhalt", "tradition", "brauch", "dorffest",
        "nachbar", "gemeinschaft", "treffen", "helfen", "feuerwehr",

        // Ortspflege und Verschönerung
        "blumen", "baumpflege", "reinigung", "bepflanzung",
        "garten", "blumenbeet", "denkmal",

        // Aktivitäten und Ereignisse
        "kirchgang", "festzug", "umzug", "markt",
        "kirtag", "erntedank", "advent", "ostern", "singen",

        // Natur und Umgebung
        "wiese", "acker", "wald", "bach", "teich",
        "feldweg", "bruecke",

        // Menschen und Rollen
        "pfarrer", "wirt", "bauer", "handwerker",
        "gemeinderat", "obmann"
    ],
    15
),


"raunaechte": new DataEntry(
        "Die Raunächte",
        10,
        15,
        [
            // Zeitbezüge
            "rauhnacht", "zwischentage", "thomasnacht", "dreikoenig", "silvester", "neujahr", "advent", "dezember", "januar",
            
            // Brauchtum und Rituale
            "raeuchern", "weihrauch", "orakel", "bleiguss", "traumdeutung", "kerze", "feuer", "ritual", "brauchtum", "tradition",
            
            // Mythologische Wesen
            "perchten", "geister", "wild", "seelen", "krampus", "percht", "gespenst", "hexe", "teufel",
            
            // Aktivitäten und Handlungen
            "raeuchern", "beten", "segnen", "reinigen", "wahrsagen", "traeumen", "meditieren", "fasten", "schweigen", "singen",
            
            // Symbolik und Gegenstände
             "glocke", "maske", "schelle", "rute", "fackel", "spiegel", "kristall", "amulett",
            
            // Naturelemente
            "vollmond", "schnee", "winter", "nebel", "sturm", "nacht", "dunkel", "kalt", "frost", "eis"
        ],
        15
    ),
    
    "silvester": new DataEntry(
        "Silvester und Neujahr",
        10,
        15,
        [
            // Traditionen und Bräuche
            "bleiguss", "feuerwerk", "boeller", "rakete", "knaller",
            "prosit", "neujahr", "mitternacht", "gluecksbringer",
            "vorsatz", "wunsch", "countdown", "champagner", "sekt",
            
            // Glückssymbole
            "kleeblatt", "hufeisen", "schornstein", "schwein",
            "glueckspilz", "marienkaefer", "geldbeutel",
            
            // Speisen und Getränke
            "fondue", "raclette", "punsch", "bowle", "krapfen",
            "linsen", "sauerkraut", "brezel",
            
            // Dekoration und Ambiente
            "konfetti", "luftschlange", "girlande", "kerzen",
            "tischfeuer", "party", "musik", "tanz",
            
            // Zeitbezug
            "jahreswechsel", "silvester", "dezember", "januar",
            "kalender", "winterzeit",

            // Wünsche und Grüße
            "prosit", "glueckwunsch", "gesundheit"
        ],
        40
    ),
    "dreikoenige": new DataEntry(
        "Heilige Drei Könige",
        10,
        15,
        [
            // Die Könige und ihre Gaben
            "caspar", "melchior", "balthasar",
            "gold", "weihrauch", "myrrhe",
            
            // Religiöse Begriffe
            "stern", "jesus", "krippe", "bethlehem",
            
            // Brauchtum
            "sternsinger", "krone", "kreide",
            "segen", "spenden", "gewand",
            
            // Zeitbezug
            "januar", "epiphanie", "weihnachten",
            "morgenland"
        ],
        20
    ),
    
    "wintervoegel": new DataEntry(
        "Wintervögel",
        10,
        15,
        [
            // Vogelarten
            "amsel", "meise", "spatz", "fink", "star", 
            "rotkehlchen", "drossel", "specht", "elster",
            "rabe", "bergfink",
            "sperling", "kohlmeise", "blaumeise", "stieglitz",
            
            // Futter und Nahrung
            "samen", "koerner", "beeren", "nuesse", "rosinen",
            "insekten", "sonnenblume", "mohn", "hafer", "weizen",
            
            // Winterbezug
            "schnee", "eis", "kaelte", "frost", "winter",
            "futterhaus", "koernerstange", "futterstelle", "meisenring",
            
            // Körperteile und Merkmale
            "schnabel", "gefieder", "fluegel", "kralle",
            "federkleid", "vogelspuren", "feder", "nest", "ei",
            
            // Verhalten
            "fliegen", "picken", "singen", "huepfen", "flattern"
        ],
        50
    ),
    
    
    "schi": new DataEntry(
        "Schifahren",
        10,
        15,
        [
            // Ausrüstung
            "ski", "stoecke", "helm", "brille", "handschuhe",
            "skischuhe", "bindung", "jacke", "hose", "gamaschen",
            "rucksack", "skipass", "schal", "muetze", "protektor",
            
            // Techniken und Fahrstile
            "pflug", "carving", "wedeln", "schwung", "bremsen",
            "slalom", "abfahrt", "springen", "kanten", "lift",
            
            // Pistenbezug
            "piste", "schnee", "loipe", "hang", "tal",
            "berg", "gondel", "sessellift", "schlepplift", "huette",
            
            // Schneearten und Bedingungen
            "pulver", "firn", "eis", "neuschnee", "harsch",
            "pistenrand", "tiefschnee", "buckelpiste", "gipfel", "lawine",
            
            // Skisport und Begriffe
            "rennen", "training", "skikurs", "lehrer", "gruppe",
            "anfaenger", "profi", "skitour", "langlauf", "alpin"
        ],
        50
    ),
    
    "griechen": new DataEntry(
        "Antikes Griechenland",
        10,
        15,
        [
            // Orte und Bauten
            "athen", "sparta", "tempel", "stadt", "markt",
            "burg", "theater", "hafen", "berg", "insel",
            
            // Menschen und Berufe
            "koenig", "bauer", "lehrer", "krieger", "buerger",
            "dichter", "kaiser", "soldat", "senator", "handel",
            
            // Alltag und Leben
            "spiele", "sport", "musik", "kunst", "schule",
            "wein", "brot", "fest", "tanz", "schiff",
            
            // Götter
            "zeus", "hera", "gott", "apollo", "athene",
            "sonne", "meer", "blitz", "eule", "pferd",
            
            // Waffen und Kampf
            "schwert", "speer", "schild", "helm", "krieg",
            "kampf", "mauer", "boot", "sieg",
            
            // Bekannte Dinge
            "olympia", "sage", "gold", "vase", "muenze",
            "ring", "statue", "toga", "fackel", "krone"
        ],
        10
    ),
    
    "das_dass": new DataEntry(
        "Das und Dass - Wortsearch",
        10,
        15,
        [
            "artikel",
            "pronomen",
            "nebensatz", 
            "konjunktion",
            "demonstrativ",
            "relativ",
            "welches",
            "dieses",
            "jenes",
            "hauptsatz",
            "das",
            "dass"
        ],
        12
    ),
	 "valentinstag": new DataEntry(
        "Valentinstag",
        10,
        15,
        [
	// Geschenke und Symbole
        "rose", "amor", "ring", "blumen", 
        "kerze", "karte", "brief", "schmuck",
        "praline", "teddy",
        
        // Romantische Begriffe und Namen
        "tanz", "musik", "engel", "romeo",
        "julia", "post", "rot", "cupido",
        "partner", "kino", "dinner",
        
      
    ],
    30
),


	"fasching": new DataEntry(
	"Fasching",
	10,
	15,
	[
	"maske", "tanz", "narr", "konfetti", "party", "musik", "clown", "hut", "ball", "spass",
	"krone", "lachen", "prinz", "witz", "keks", "fest", "tanz", "parade", "masken", "krapfen",
	"hexe", "zirkus", "scherz", "spiel", "singen", "tanzen", "bunt", "toll", "wild", "lustig",
	"feier", "klub", "verein", "stern", "glanz", "disco", "show", "gold", "kette", "perlen",
	"schmuck", "schminke", "prank", "trick", "nase", "magie", "wange", "zepter", "strass", "bart"
	],
	15
	),
	
	
	"dsk_fasching": new DataEntry(
    "Fasching",
    10,
    15,
    [
        "maske", "tanz", "narr", "konfetti", "party", "musik", "clown", "hut", "ball", "spass",
        "krone", "lachen", "prinz", "witz", "keks", "fest", "tanz", "parade", "krapfen",
        "hexe", "zirkus", "scherz", "spiel", "singen", "tanzen", "bunt", "toll", "wild", "lustig",
        "feier", "klub", "verein", "stern", "glanz", "disco", "show", "gold", "kette", "perlen",
        "schmuck", "schminke", "prank", "trick", "nase", "magie", "wange", "zepter", "strass", "bart", "zauber", "trank", "kessel", "ritual", "fluch", "besen", "stab", "kristall", "orakel", "mystik", 
        "elixier", "amulett", "rune", "pendel", "tarot", "magier", "druide", "geist", "kerze", "kugel",
        "verhexen", "magierin", "schatten", "hexen", "wesen", "zirkel", "kobold", "fee",
        "nixe", "elf", "troll", "alraune", "hut", "buch", "siegel", "robe", "mantel",
        "spruch", "formel", "ritual", "nebel", "kräuter", "salbe", "wunder"
    ],
    15
),


};
