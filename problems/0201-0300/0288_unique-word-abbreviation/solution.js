// One abbreviation group per abbreviation, held as a set of words;
// isUnique applies the two-condition rule directly: the group for the
// query's abbreviation must be empty, or contain nothing but the query
// itself.
class ValidWordAbbr {
    constructor(dictionary) {
        // A set per abbreviation: listing "deer" twice must leave the
        // group {"deer"} — a word never collides with its own duplicates.
        this.groups = new Map();
        dictionary.forEach((word) => {
            const key = abbrev(word);
            const group = this.groups.get(key);
            if (group === undefined) {
                this.groups.set(key, new Set([word]));
            } else {
                group.add(word);
            }
        });
    }

    isUnique(word) {
        const group = this.groups.get(abbrev(word));
        // No word with this abbreviation, or every such word is `word`.
        return group === undefined || (group.size === 1 && group.has(word));
    }
}

function abbrev(word) {
    // First letter + count of the letters between + last letter; a word
    // of one or two characters is an abbreviation of itself.
    if (word.length <= 2) {
        return word;
    }
    return word[0] + String(word.length - 2) + word[word.length - 1];
}
