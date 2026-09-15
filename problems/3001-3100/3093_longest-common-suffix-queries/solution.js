/**
 * @param {string[]} wordsContainer
 * @param {string[]} wordsQuery
 * @return {number[]}
 */
var stringIndices = function (wordsContainer, wordsQuery) {
    const lens = wordsContainer.map((w) => w.length);

    // Tie-break: shorter word wins, then the smaller index.
    function better(a, b) {
        if (b === -1) {
            return true;
        }
        if (lens[a] !== lens[b]) {
            return lens[a] < lens[b];
        }
        return a < b;
    }

    // Trie over reversed words; the root represents the empty suffix.
    const root = { best: -1 };

    // Insert each word backwards, annotating every visited node, root included.
    for (let i = 0; i < wordsContainer.length; i++) {
        const word = wordsContainer[i];
        let node = root;
        if (better(i, node.best)) {
            node.best = i;
        }
        for (let j = word.length - 1; j >= 0; j--) {
            const ch = word[j];
            let nxt = node[ch];
            if (nxt === undefined) {
                nxt = { best: -1 };
                node[ch] = nxt;
            }
            node = nxt;
            if (better(i, node.best)) {
                node.best = i;
            }
        }
    }

    // Walk the reversed query as deep as the trie allows; deepest node's best wins.
    const ans = [];
    for (const word of wordsQuery) {
        let node = root;
        // Root's best answers the empty-suffix case (no child matched).
        let res = root.best;
        for (let j = word.length - 1; j >= 0; j--) {
            const nxt = node[word[j]];
            if (nxt === undefined) {
                break;
            }
            node = nxt;
            res = node.best;
        }
        ans.push(res);
    }
    return ans;
};
