from typing import List


class Solution:
    def shortestSubstrings(self, arr: List[str]) -> List[str]:
        # Join every other string into one scan text, NUL-separated so a
        # match can never straddle a boundary; since candidates contain
        # only lowercase letters, one containment test per candidate then
        # covers "occurs in any other string". Candidates are tried
        # shortest first and, within a length, in sorted order, so the
        # first survivor is both shortest and lexicographically smallest.
        answer = []
        for i, s in enumerate(arr):
            others = "\0".join(x for j, x in enumerate(arr) if j != i)
            best = ""
            for length in range(1, len(s) + 1):
                candidates = sorted({s[a : a + length] for a in range(len(s) - length + 1)})
                survivors = [c for c in candidates if c not in others]
                if survivors:
                    best = survivors[0]
                    break
            answer.append(best)
        return answer
