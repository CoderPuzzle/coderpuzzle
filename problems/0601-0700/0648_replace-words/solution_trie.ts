interface TrieNode {
    children: (TrieNode | null)[];
    end: boolean;
}

function makeTrieNode(): TrieNode {
    return { children: new Array<TrieNode | null>(26).fill(null), end: false };
}

function replaceWords(dictionary: string[], sentence: string): string {
    // The trie stores every root once; a node's `end` marks that a root
    // stops exactly there. Walking a word's own letters visits its
    // prefixes shortest first, so the first `end` on the path is the
    // shortest matching root — no per-length retries, and no length cap:
    // the tree has no branches deeper than the longest root anyway.
    const trie = makeTrieNode();
    for (const root of dictionary) {
        let node = trie;
        for (const letter of root) {
            const slot = letter.charCodeAt(0) - 97;
            if (node.children[slot] === null) {
                node.children[slot] = makeTrieNode();
            }
            node = node.children[slot]!;
        }
        node.end = true;
    }
    // A walk that falls off the tree, or finishes without ever reaching
    // an `end`, found no root prefix — the word stands for itself.
    const replaced: string[] = [];
    for (const word of sentence.split(" ")) {
        let replacement = word;
        let node: TrieNode | null = trie;
        for (let index = 0; index < word.length; index++) {
            node = node.children[word.charCodeAt(index) - 97];
            if (node === null) {
                break;
            }
            if (node.end) {
                replacement = word.slice(0, index + 1);
                break;
            }
        }
        replaced.push(replacement);
    }
    return replaced.join(" ");
}
