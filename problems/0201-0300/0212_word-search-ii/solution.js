/**
 * @param {string[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
    const m = board.length,
        n = board[0].length;
    // Trie of nested Maps; a terminal "#" key stores the whole word so it
    // can be recovered without rebuilding it letter by letter.
    const trie = new Map();
    for (const word of words) {
        let node = trie;
        for (const ch of word) {
            if (!node.has(ch)) node.set(ch, new Map());
            node = node.get(ch);
        }
        node.set("#", word);
    }

    // A cell is used at most once within a word (the seen grid tracks the
    // current path); the set dedups words found along several paths.
    const found = new Set();
    const seen = Array.from({ length: m }, () => new Array(n).fill(false));

    const dfs = (i, j, node) => {
        const ch = board[i][j];
        // Walk the trie in lockstep with board moves: a missing child rules
        // out the whole subtree of words with that prefix at once.
        if (!node.has(ch)) return;
        node = node.get(ch);
        if (node.has("#")) found.add(node.get("#"));
        seen[i][j] = true;
        for (const [di, dj] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]) {
            const ni = i + di,
                nj = j + dj;
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && !seen[ni][nj]) {
                dfs(ni, nj, node);
            }
        }
        // Unmark on the way out so the cell can serve other paths/words.
        seen[i][j] = false;
    };

    // A word may begin anywhere, so start a DFS from every cell.
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dfs(i, j, trie);
        }
    }
    return Array.from(found).sort();
};
