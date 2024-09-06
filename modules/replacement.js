import { PATTERN_TSV_INDEX } from "./pattern-tsv-index.js";

/**
 * corresponds to a line of a pattern tsv
 */
export class Replacement {
    #regExp;
    #replacement;

    /**
     * 
     * @param {string} pattern 
     * @param {string} flag 
     * @param {string} replacement 
     */
    constructor(pattern, flag, replacement) {
        this.#regExp = new RegExp(pattern, flag);
        this.#replacement = replacement;
    }

    getRegExp() {
        return this.#regExp;
    }

    getReplacement() {
        return this.#replacement;
    }

    /**
    * tsv format:
    * Pattern	Flags	Replacement
    * @param {string} tsv file content
    * @returns {Array<Replacement>}
    */
   static readPatternTsv(tsv) {
     if (tsv == null) {
       throw new Error("no pattern text");
     }
   
     const replacements = new Array();
   
     // I would to read line by line, but I don't know it in Javascript
     const lines = tsv.split(/\r?\n/);
   
     // ignore the header
     for(let i = 1; i < lines.length; ++i) {
       // split one tab or spaces
       const words = lines[i].split(/\t|\s+/);
   
       
       
       try {
         // format error
         if (words.length < PATTERN_TSV_INDEX.Size) {
           throw new Error(`pattern line requires: Pattern    Flags    Replacement`);
         }
   
         replacements.push(new Replacement(
           words[PATTERN_TSV_INDEX.Pattern],
           words[PATTERN_TSV_INDEX.Flags],
           words[PATTERN_TSV_INDEX.Replacement]
         ));
       }
       catch(cause) {
         throw new Error(`Pattern TSV Format Error\n${cause.message}\n\n line ${i + 1}:\n${lines[i]}`,
           {cause: cause}
         );
       }
     }
   
     return replacements;
   }
}