class Solution:
    def minOperations(self, word1: str, word2: str) -> int:
        # Per part, an index may serve at most one swap, one replace and
        # one reversal, so an optimal schedule permutes first (at most one
        # reversal plus disjoint swaps) and replaces what is left. A swap
        # pays off exactly on a mutual pair (a,b)/(b,a); with type counts
        # cnt[a][b] = #{p: s[p]=a != t[p]=b}, the largest swap matching is
        # sum min(cnt[a][b], cnt[b][a]), and the part costs wrong - pairs,
        # or 1 + wrong' - pairs' when reversed first.
        n = len(word1)

        def swap_pairs(cnt):
            total = 0
            for a in range(26):
                for b in range(a + 1, 26):
                    total += min(cnt[a][b], cnt[b][a])
            return total

        cost = [[0] * n for _ in range(n)]
        for i in range(n):
            for j in range(i, n):
                cnt = [[0] * 26 for _ in range(26)]
                cnt_rev = [[0] * 26 for _ in range(26)]
                wrong = wrong_rev = 0
                for p in range(i, j + 1):
                    a, b = ord(word1[p]) - 97, ord(word2[p]) - 97
                    if a != b:
                        wrong += 1
                        cnt[a][b] += 1
                    a_rev = ord(word1[j - (p - i)]) - 97
                    if a_rev != b:
                        wrong_rev += 1
                        cnt_rev[a_rev][b] += 1
                cost[i][j] = min(
                    wrong - swap_pairs(cnt),
                    1 + wrong_rev - swap_pairs(cnt_rev),
                )
        # Partition DP over prefix lengths; costs add across parts.
        best = [0] + [10**9] * n
        for end in range(1, n + 1):
            for start in range(end):
                candidate = best[start] + cost[start][end - 1]
                if candidate < best[end]:
                    best[end] = candidate
        return best[n]
