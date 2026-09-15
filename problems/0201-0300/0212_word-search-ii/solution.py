from typing import List, Optional


class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        m, n = len(board), len(board[0])
        # Trie of nested dicts; a terminal "#" key stores the whole word so it
        # can be recovered without rebuilding it letter by letter.
        trie = {}
        for word in words:
            node = trie
            for ch in word:
                node = node.setdefault(ch, {})
            node["#"] = word

        found = set()
        # Cells marked while on the current path (a cell is used at most once
        # within a word); the set dedups words found along several paths.
        seen = [[False] * n for _ in range(m)]

        def dfs(i, j, node):
            ch = board[i][j]
            # Walk the trie in lockstep with board moves: a missing child
            # rules out the whole subtree of words with that prefix at once.
            if ch not in node:
                return
            node = node[ch]
            if "#" in node:
                found.add(node["#"])
            seen[i][j] = True
            for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ni, nj = i + di, j + dj
                if 0 <= ni < m and 0 <= nj < n and not seen[ni][nj]:
                    dfs(ni, nj, node)
            # Unmark on the way out so the cell can serve other paths/words.
            seen[i][j] = False

        # A word may begin anywhere, so start a DFS from every cell.
        for i in range(m):
            for j in range(n):
                dfs(i, j, trie)
        return sorted(found)
