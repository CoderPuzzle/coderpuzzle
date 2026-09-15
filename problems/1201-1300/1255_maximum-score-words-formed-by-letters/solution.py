from typing import List, Optional


class Solution:
    def maxScoreWords(self, words: List[str], letters: List[str], score: List[int]) -> int:
        # 26-entry count of the letter pool
        available = [0] * 26
        for ch in letters:
            available[ord(ch) - ord("a")] += 1
        n = len(words)
        # precompute each word's letter-requirement vector and total score so
        # the recursion works on counts only (n <= 14 makes 2^n enumeration fine)
        needs = []
        values = []
        for w in words:
            need = [0] * 26
            value = 0
            for ch in w:
                idx = ord(ch) - ord("a")
                need[idx] += 1
                value += score[idx]
            needs.append(need)
            values.append(value)

        best = 0

        def dfs(i, remaining, total):
            nonlocal best
            # every node is already a complete valid selection (the rest can
            # be skipped), so compare best here rather than only at leaves
            if total > best:
                best = total
            if i == n:
                return
            # branch 1: always explore skipping word i
            dfs(i + 1, remaining, total)
            # branch 2: take word i only when the pool covers it; an
            # infeasible word simply prunes that subtree
            need = needs[i]
            if all(remaining[j] >= need[j] for j in range(26)):
                dfs(
                    i + 1,
                    [remaining[j] - need[j] for j in range(26)],
                    total + values[i],
                )

        dfs(0, available, 0)
        return best
