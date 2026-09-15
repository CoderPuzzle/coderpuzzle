from typing import List, Optional


class Solution:
    def wordSubsets(self, words1: List[str], words2: List[str]) -> List[str]:
        def counts(s: str) -> List[int]:
            # One slot per letter: "aba" -> [2, 1, 0, ...].
            c = [0] * 26
            for ch in s:
                c[ord(ch) - ord("a")] += 1
            return c

        # Collapse words2 to a single requirement vector: per letter, the
        # max count any one b demands. Covering the max covers every b,
        # because each b is checked independently by the definition.
        need = [0] * 26
        for b in words2:
            for i, n in enumerate(counts(b)):
                need[i] = max(need[i], n)

        # A word is universal iff its counts dominate the collapsed demand
        # everywhere; survivors keep their input order.
        return [a for a in words1 if all(x >= y for x, y in zip(counts(a), need))]
