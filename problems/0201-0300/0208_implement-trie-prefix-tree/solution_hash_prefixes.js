class Trie {
    constructor() {
        // One set of whole words, one set of every beginning of every
        // word; nothing is shared between words beyond hash collisions.
        this.words = new Set();
        this.prefixes = new Set();
    }

    insert(word) {
        this.words.add(word);
        // Record every beginning, the word itself included — a word begins
        // with itself, so it is its own longest prefix.
        for (let end = 1; end <= word.length; end++) {
            this.prefixes.add(word.slice(0, end));
        }
    }

    search(word) {
        return this.words.has(word);
    }

    startsWith(prefix) {
        return this.prefixes.has(prefix);
    }
}
