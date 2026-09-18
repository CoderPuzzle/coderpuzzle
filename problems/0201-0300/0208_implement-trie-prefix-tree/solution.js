class Trie {
    constructor() {
        this.root = Trie.makeNode();
    }

    // One trie node: 26 child slots indexed by c - 'a' plus a whole-word
    // terminator flag; nodes appear lazily on insert.
    static makeNode() {
        return { children: new Array(26).fill(null), end: false };
    }

    insert(word) {
        let node = this.root;
        for (const letter of word) {
            const slot = letter.charCodeAt(0) - 97;
            if (node.children[slot] === null) {
                node.children[slot] = Trie.makeNode();
            }
            node = node.children[slot];
        }
        node.end = true;
    }

    // Walks one node per character; null as soon as a slot is empty.
    walk(text) {
        let node = this.root;
        for (const letter of text) {
            node = node.children[letter.charCodeAt(0) - 97];
            if (node === null) {
                return null;
            }
        }
        return node;
    }

    search(word) {
        const node = this.walk(word);
        return node !== null && node.end;
    }

    startsWith(prefix) {
        return this.walk(prefix) !== null;
    }
}
