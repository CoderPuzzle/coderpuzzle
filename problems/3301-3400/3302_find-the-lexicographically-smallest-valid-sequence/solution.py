from typing import List


class Solution:
    def validSequence(self, word1: str, word2: str) -> List[int]:
        # last[j] anchors where word2[j:] is still exactly embeddable: one
        # right-to-left sweep matches the tail of word2 against word1 and
        # records, per slot, the index that consumed its character. The
        # forward walk then takes every exact match immediately and spends
        # the single allowed change only when the guard proves the rest of
        # word2 still fits exactly after it (last slot, or i before
        # last[j + 1]); a change already spent forbids further mismatches.
        m = len(word2)
        ans = [0] * m
        last = [-1] * m
        i, j = len(word1) - 1, m - 1
        while i >= 0 and j >= 0:
            if word1[i] == word2[j]:
                last[j] = i
                j -= 1
            i -= 1
        can_change = True
        j = 0
        for i, c in enumerate(word1):
            if j == m:
                break
            if c == word2[j]:
                ans[j] = i
                j += 1
            elif can_change and (j == m - 1 or i < last[j + 1]):
                can_change = False
                ans[j] = i
                j += 1
        return ans if j == m else []
