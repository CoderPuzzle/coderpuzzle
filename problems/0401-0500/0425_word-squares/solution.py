from typing import List, Optional


class Solution:
    def wordSquares(self, words: List[str]) -> List[List[str]]:
        n = len(words[0])
        # Map every prefix of every word (empty prefix included) to the words
        # sharing it, so each search step is a single lookup.
        prefix_map = {}
        for w in words:
            for i in range(n + 1):
                prefix_map.setdefault(w[:i], []).append(w)

        results = []

        def backtrack(square):
            if len(square) == n:
                results.append(list(square))
                return
            col = len(square)
            # Row `col` must start with the column-`col` chars already placed,
            # so the next word is constrained to one forced prefix.
            prefix = "".join(square[r][col] for r in range(col))
            # A word with that prefix satisfies square[j][col] == square[col][j]
            # for every earlier row j at once; a missing bucket prunes here.
            for w in prefix_map.get(prefix, []):
                backtrack(square + [w])

        backtrack([])
        # Sorting only makes the output order deterministic.
        return sorted(results)
