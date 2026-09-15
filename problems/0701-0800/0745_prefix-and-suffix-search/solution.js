// One hash entry per (prefix, suffix) pair, built once at construction:
// for each word, every prefix of the word is joined to every suffix
// through a '#' -- no word or query can contain it, since both are
// lowercase letters only -- and the entry holds the word's index.
// Processing words left to right makes later words overwrite earlier
// ones, so every entry ends up holding the largest matching index, and
// f() is a single lookup that answers -1 when the key is absent.
class WordFilter {
    constructor(words) {
        this.weights = new Map();
        words.forEach((word, index) => {
            for (let prefix = 0; prefix <= word.length; prefix++) {
                const head = word.slice(0, prefix);
                for (let suffix = 0; suffix <= word.length; suffix++) {
                    this.weights.set(head + "#" + word.slice(suffix), index);
                }
            }
        });
    }

    f(pref, suff) {
        const found = this.weights.get(pref + "#" + suff);
        return found === undefined ? -1 : found;
    }
}
