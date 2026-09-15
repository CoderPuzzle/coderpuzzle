// Words grouped by length; each buildDict REPLACES the previous dictionary,
// so search only ever sees the latest call's words. A candidate matches when
// it differs from the search word in exactly one position.
class MagicDictionary {
    constructor() {
        this.buckets = new Map();
    }

    buildDict(dictionary) {
        const buckets = new Map();
        for (const word of dictionary) {
            const length = word.length;
            if (!buckets.has(length)) {
                buckets.set(length, []);
            }
            buckets.get(length).push(word);
        }
        this.buckets = buckets;
    }

    search(searchWord) {
        for (const word of this.buckets.get(searchWord.length) || []) {
            let mismatches = 0;
            for (let index = 0; index < word.length; ++index) {
                if (word[index] !== searchWord[index]) {
                    ++mismatches;
                    if (mismatches > 1) {
                        break;
                    }
                }
            }
            if (mismatches === 1) {
                return true;
            }
        }
        return false;
    }
}
