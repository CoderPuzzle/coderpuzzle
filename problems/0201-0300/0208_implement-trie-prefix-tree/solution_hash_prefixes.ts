class Trie {
    // One set of whole words, one set of every beginning of every word;
    // nothing is shared between words beyond accidental hash collisions.
    private words: Set<string> = new Set();
    private prefixes: Set<string> = new Set();

    constructor() {}

    insert(word: string): void {
        this.words.add(word);
        // Record every beginning, the word itself included — a word begins
        // with itself, so it is its own longest prefix.
        for (let end = 1; end <= word.length; end++) {
            this.prefixes.add(word.slice(0, end));
        }
    }

    search(word: string): boolean {
        return this.words.has(word);
    }

    startsWith(prefix: string): boolean {
        return this.prefixes.has(prefix);
    }
}
