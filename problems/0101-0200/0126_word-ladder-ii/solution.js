/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function (beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return [];
    // Drop beginWord so the search can never route back through it.
    wordSet.delete(beginWord);

    // BFS over the implicit one-letter-difference graph: record each word's
    // shortest distance and a DAG of shortest-path edges.
    const dist = new Map([[beginWord, 0]]);
    const adjacency = new Map();
    const queue = [beginWord];
    const letters = "abcdefghijklmnopqrstuvwxyz";
    for (let head = 0; head < queue.length; head++) {
        const word = queue[head];
        const d = dist.get(word);
        for (let i = 0; i < word.length; i++) {
            // Try substituting each of the 25 other letters at position i.
            for (const c of letters) {
                if (c === word[i]) continue;
                const nxt = word.slice(0, i) + c + word.slice(i + 1);
                if (!wordSet.has(nxt)) continue;
                const nd = dist.get(nxt);
                if (nd === undefined) {
                    // First discovery: nxt is one level below word.
                    dist.set(nxt, d + 1);
                    if (!adjacency.has(word)) adjacency.set(word, []);
                    adjacency.get(word).push(nxt);
                    queue.push(nxt);
                } else if (nd === d + 1) {
                    // Already exactly one level below: parallel shortest edge.
                    if (!adjacency.has(word)) adjacency.set(word, []);
                    adjacency.get(word).push(nxt);
                }
                // Same-level or backward edges never lie on a shortest ladder,
                // so they are simply not recorded.
            }
        }
    }

    const result = [];
    const path = [beginWord];

    // DFS over the recorded DAG: every edge advances exactly one BFS level, so
    // any root-to-endWord walk is automatically a shortest ladder.
    const dfs = (word) => {
        if (word === endWord) {
            result.push(path.slice());
            return;
        }
        const neighbors = adjacency.get(word) || [];
        for (const nxt of neighbors) {
            path.push(nxt);
            dfs(nxt);
            path.pop();
        }
    };

    dfs(beginWord);
    return result;
};
