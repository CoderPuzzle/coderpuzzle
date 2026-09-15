class MagicDictionary {
    constructor() {
        this.root = MagicDictionary.makeNode();
    }

    // One trie node: 26 child slots indexed by c - 'a' plus a whole-word
    // terminator flag. Each buildDict REPLACES the previous tree, so
    // search only ever sees the latest call's words.
    static makeNode() {
        return { children: new Array(26).fill(null), end: false };
    }

    buildDict(dictionary) {
        const fresh = MagicDictionary.makeNode();
        for (const word of dictionary) {
            let node = fresh;
            for (const letter of word) {
                const slot = letter.charCodeAt(0) - 97;
                if (node.children[slot] === null) {
                    node.children[slot] = MagicDictionary.makeNode();
                }
                node = node.children[slot];
            }
            node.end = true;
        }
        this.root = fresh;
    }

    search(searchWord) {
        return this.descend(this.root, searchWord, 0, 1);
    }

    // The child holding the query's own letter continues for free; any other
    // child spends the single change, and success means a flagged node at
    // the query's end with the change spent.
    descend(node, word, index, editsLeft) {
        if (index === word.length) {
            return node.end && editsLeft === 0;
        }
        const wanted = word.charCodeAt(index) - 97;
        for (let slot = 0; slot < 26; ++slot) {
            const child = node.children[slot];
            if (child === null) {
                continue;
            }
            let remaining = editsLeft;
            if (slot !== wanted) {
                --remaining;
            }
            if (remaining < 0) {
                continue;
            }
            if (this.descend(child, word, index + 1, remaining)) {
                return true;
            }
        }
        return false;
    }
}
