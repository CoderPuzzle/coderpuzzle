from typing import List


class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        words = set(wordDict)
        n = len(s)
        # dp[i] holds every sentence for the prefix s[:i]. Each table entry is
        # built by appending one last word to a sentence of a shorter prefix,
        # so a prefix that cannot be segmented stays empty and every split
        # hanging off it is pruned before any substring is cut.
        dp: List[List[str]] = [[] for _ in range(n + 1)]
        # The empty prefix segments into exactly one sentence: the empty one.
        dp[0] = [""]
        for i in range(1, n + 1):
            # The split j runs downward, so the candidate last word s[j:i] is
            # one character long first and grows: sentences whose last word is
            # shorter come first, and among equal last words the sentences of
            # dp[j] keep their own order. That is exactly the order the
            # statement pins, emitted for free — no sorting pass at the end.
            for j in range(i - 1, -1, -1):
                if not dp[j]:
                    continue
                last = s[j:i]
                if last not in words:
                    continue
                for head in dp[j]:
                    dp[i].append(last if j == 0 else head + " " + last)
        return dp[n]
