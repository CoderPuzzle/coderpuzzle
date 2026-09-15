interface TrieNode {
    best: number;
    [key: string]: number | TrieNode;
}

function stringIndices(wordsContainer: string[], wordsQuery: string[]): number[] {
    const lens = wordsContainer.map((w) => w.length);

    // Tie-break: shorter word wins, then the smaller index.
    function better(a: number, b: number): boolean {
        if (b === -1) {
            return true;
        }
        if (lens[a] !== lens[b]) {
            return lens[a] < lens[b];
        }
        return a < b;
    }

    // Trie over reversed words; the root represents the empty suffix.
    const root: TrieNode = { best: -1 };

    // Insert each word backwards, annotating every visited node, root included.
    for (let i = 0; i < wordsContainer.length; i++) {
        const word = wordsContainer[i];
        let node: TrieNode = root;
        if (better(i, node.best as number)) {
            node.best = i;
        }
        for (let j = word.length - 1; j >= 0; j--) {
            const ch = word[j];
            let nxt = node[ch] as TrieNode | undefined;
            if (nxt === undefined) {
                nxt = { best: -1 };
                node[ch] = nxt;
            }
            node = nxt;
            if (better(i, node.best as number)) {
                node.best = i;
            }
        }
    }

    // Walk the reversed query as deep as the trie allows; deepest node's best wins.
    const ans: number[] = [];
    for (const word of wordsQuery) {
        let node: TrieNode = root;
        // Root's best answers the empty-suffix case (no child matched).
        let res = root.best as number;
        for (let j = word.length - 1; j >= 0; j--) {
            const nxt = node[word[j]] as TrieNode | undefined;
            if (nxt === undefined) {
                break;
            }
            node = nxt;
            res = node.best as number;
        }
        ans.push(res);
    }
    return ans;
}
