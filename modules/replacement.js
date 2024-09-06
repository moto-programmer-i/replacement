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
}