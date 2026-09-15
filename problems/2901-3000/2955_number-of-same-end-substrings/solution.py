from typing import List


class Solution:
    def sameEndSubstringCount(self, s: str, queries: List[List[int]]) -> List[int]:
        # cnt[c][j] = occurrences of letter c in s[:j]. A query answer is the
        # sum over letters of t*(t+1)//2 for the range frequency t: every
        # position pairs with itself, and each equal pair of positions is one
        # same-end substring. Max answer 450015000 fits in 32 bits.
        n = len(s)
        cnt = [[0] * (n + 1) for _ in range(26)]
        for j in range(1, n + 1):
            for c in range(26):
                cnt[c][j] = cnt[c][j - 1]
            cnt[ord(s[j - 1]) - 97][j] += 1
        ans = []
        for l, r in queries:
            total = 0
            for c in range(26):
                t = cnt[c][r + 1] - cnt[c][l]
                total += t * (t + 1) // 2
            ans.append(total)
        return ans
