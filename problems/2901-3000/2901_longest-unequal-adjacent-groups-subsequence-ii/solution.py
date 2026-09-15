from typing import List


class Solution:
    def getWordsInLongestSubsequence(self, words: List[str], groups: List[int]) -> List[str]:
        # dp[i] is the length of the longest valid subsequence ending at
        # index i; prev[i] remembers the predecessor that achieved it.
        # Scanning predecessors from i - 1 downward and updating only on a
        # strict improvement keeps the latest compatible index attaining the
        # maximum, which pins one deterministic answer out of the many the
        # statement permits.
        n = len(words)
        dp = [1] * n
        prev = [-1] * n
        for i in range(n):
            word_i = words[i]
            for j in range(i - 1, -1, -1):
                if groups[j] == groups[i] or len(words[j]) != len(word_i):
                    continue
                if dp[j] + 1 <= dp[i]:
                    continue
                # Hamming distance exactly 1: walk the equal-length strings
                # and stop at a second mismatch.
                diffs = 0
                for a, b in zip(words[j], word_i):
                    if a != b:
                        diffs += 1
                        if diffs > 1:
                            break
                if diffs == 1:
                    dp[i] = dp[j] + 1
                    prev[i] = j
        best = n - 1
        for i in range(n - 2, -1, -1):
            if dp[i] > dp[best]:
                best = i
        chain = []
        i = best
        while i != -1:
            chain.append(i)
            i = prev[i]
        return [words[i] for i in reversed(chain)]
