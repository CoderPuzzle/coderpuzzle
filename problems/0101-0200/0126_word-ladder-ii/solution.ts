function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
    const wordSet = new Set<string>(wordList);
    if (!wordSet.has(endWord)) return [];
    // Drop beginWord so the search can never route back through it.
    wordSet.delete(beginWord);

    // BFS over the implicit one-letter-difference graph: record each word's
    // shortest distance and a DAG of shortest-path edges.
    const dist = new Map<string, number>([[beginWord, 0]]);
    const adjacency = new Map<string, string[]>();
    const queue: string[] = [beginWord];
    const letters = "abcdefghijklmnopqrstuvwxyz";
    for (let head = 0; head < queue.length; head++) {
        const word = queue[head];
        const d = dist.get(word)!;
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
                    let list = adjacency.get(word);
                    if (!list) {
                        list = [];
                        adjacency.set(word, list);
                    }
                    list.push(nxt);
                    queue.push(nxt);
                } else if (nd === d + 1) {
                    // Already exactly one level below: parallel shortest edge.
                    let list = adjacency.get(word);
                    if (!list) {
                        list = [];
                        adjacency.set(word, list);
                    }
                    list.push(nxt);
                }
                // Same-level or backward edges never lie on a shortest ladder,
                // so they are simply not recorded.
            }
        }
    }

    const result: string[][] = [];
    const path: string[] = [beginWord];

    // DFS over the recorded DAG: every edge advances exactly one BFS level, so
    // any root-to-endWord walk is automatically a shortest ladder.
    const dfs = (word: string): void => {
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
}
