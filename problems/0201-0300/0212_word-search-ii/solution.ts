function findWords(board: string[][], words: string[]): string[] {
    const m = board.length,
        n = board[0].length;
    // Trie of nested Maps; a terminal "#" key stores the whole word so it
    // can be recovered without rebuilding it letter by letter.
    type TrieNode = Map<string, TrieEntry>;
    type TrieEntry = TrieNode | string;
    const trie: TrieNode = new Map();
    for (const word of words) {
        let node: TrieNode = trie;
        for (const ch of word) {
            if (!node.has(ch)) node.set(ch, new Map() as TrieEntry);
            node = node.get(ch) as TrieNode;
        }
        node.set("#", word);
    }

    // A cell is used at most once within a word (the seen grid tracks the
    // current path); the set dedups words found along several paths.
    const found = new Set<string>();
    const seen: boolean[][] = Array.from({ length: m }, () => new Array<boolean>(n).fill(false));

    const dfs = (i: number, j: number, node: TrieNode): void => {
        const ch = board[i][j];
        // Walk the trie in lockstep with board moves: a missing child rules
        // out the whole subtree of words with that prefix at once.
        if (!node.has(ch)) return;
        let next = node.get(ch) as TrieNode;
        if (next.has("#")) found.add(next.get("#") as string);
        seen[i][j] = true;
        const dirs: number[][] = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];
        for (const [di, dj] of dirs) {
            const ni = i + di,
                nj = j + dj;
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && !seen[ni][nj]) {
                dfs(ni, nj, next);
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
}
