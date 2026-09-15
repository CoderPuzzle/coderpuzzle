// Two tries, one word list per node: a prefix trie spelling every word
// forward and a suffix trie spelling every word reversed, so a suffix
// reads down it front to back. Words are inserted in index order, so
// every node's list ascends, and f() walks pref down the first
// trie and suff reversed down the second, then merges the two hit nodes'
// lists from their tails -- the first equal pair is the largest shared
// index, and a walk that falls off its trie means no word matches that
// half, answering -1.
interface TrieNode {
    children: (TrieNode | null)[];
    indices: number[];
}

class WordFilter {
    private prefixes: TrieNode = WordFilter.makeNode();
    private suffixes: TrieNode = WordFilter.makeNode();

    // One trie node: 26 child slots indexed by c - 'a' plus the indices
    // of every word whose path crosses it.
    private static makeNode(): TrieNode {
        return { children: new Array<TrieNode | null>(26).fill(null), indices: [] };
    }

    constructor(words: string[]) {
        words.forEach((word, index) => {
            let node = this.prefixes;
            for (const letter of word) {
                const slot = letter.charCodeAt(0) - 97;
                if (node.children[slot] === null) {
                    node.children[slot] = WordFilter.makeNode();
                }
                node = node.children[slot]!;
                node.indices.push(index);
            }
            node = this.suffixes;
            for (let position = word.length - 1; position >= 0; position--) {
                const slot = word.charCodeAt(position) - 97;
                if (node.children[slot] === null) {
                    node.children[slot] = WordFilter.makeNode();
                }
                node = node.children[slot]!;
                node.indices.push(index);
            }
        });
    }

    f(pref: string, suff: string): number {
        const forward = this.walkForward(pref);
        if (forward === null) {
            return -1;
        }
        const backward = this.walkBackward(suff);
        if (backward === null) {
            return -1;
        }
        const front = forward.indices;
        const back = backward.indices;
        let i = front.length - 1;
        let j = back.length - 1;
        while (i >= 0 && j >= 0) {
            if (front[i] === back[j]) {
                return front[i];
            }
            if (front[i] > back[j]) {
                i--;
            } else {
                j--;
            }
        }
        return -1;
    }

    // Walks pref down the prefix trie one node per character; null as soon
    // as a slot is empty.
    private walkForward(pref: string): TrieNode | null {
        let node: TrieNode | null = this.prefixes;
        for (const letter of pref) {
            node = node.children[letter.charCodeAt(0) - 97];
            if (node === null) {
                return null;
            }
        }
        return node;
    }

    // Walks suff down the suffix trie, whose edges spell the reversed
    // words, so the characters are consumed from the end; null as soon as
    // a slot is empty.
    private walkBackward(suff: string): TrieNode | null {
        let node: TrieNode | null = this.suffixes;
        for (let position = suff.length - 1; position >= 0; position--) {
            node = node.children[suff.charCodeAt(position) - 97];
            if (node === null) {
                return null;
            }
        }
        return node;
    }
}
