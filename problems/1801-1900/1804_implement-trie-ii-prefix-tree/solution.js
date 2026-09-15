// A trie whose nodes each count the inserted instances ending at the
// node (wordCount) and passing through it (prefixCount). insert walks
// the word creating children on demand, bumping prefixCount along the
// path and wordCount at the terminal; the two count queries walk their
// string as far as nodes exist and read the matching counter, answering
// 0 when the walk falls off the trie. erase — guaranteed by the
// constraints to name a present word — confirms a live instance with a
// first walk, then decrements the same counters on a second; nodes left
// at zero stay in place, since no live instance crosses them anymore.
class Trie {
    constructor() {
        this.root = this.newNode();
    }

    newNode() {
        return { children: new Map(), wordCount: 0, prefixCount: 0 };
    }

    insert(word) {
        let node = this.root;
        for (const character of word) {
            let child = node.children.get(character);
            if (child === undefined) {
                child = this.newNode();
                node.children.set(character, child);
            }
            node = child;
            node.prefixCount++;
        }
        node.wordCount++;
    }

    countWordsEqualTo(word) {
        let node = this.root;
        for (const character of word) {
            node = node.children.get(character);
            if (node === undefined) {
                return 0;
            }
        }
        return node.wordCount;
    }

    countWordsStartingWith(prefix) {
        let node = this.root;
        for (const character of prefix) {
            node = node.children.get(character);
            if (node === undefined) {
                return 0;
            }
        }
        return node.prefixCount;
    }

    erase(word) {
        let node = this.root;
        for (const character of word) {
            node = node.children.get(character);
            if (node === undefined) {
                return;
            }
        }
        if (node.wordCount === 0) {
            return;
        }
        node = this.root;
        for (const character of word) {
            node = node.children.get(character);
            node.prefixCount--;
        }
        node.wordCount--;
    }
}
