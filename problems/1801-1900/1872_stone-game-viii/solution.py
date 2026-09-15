from itertools import accumulate


class Solution:
    def stoneGameVIII(self, stones: List[int]) -> int:
        # The row is always [prefix[j], stones[j], ...]; a move from
        # frontier j nets exactly prefix[k] for the chosen k>j, so
        # f(j) = max_{k>j}(prefix[k] - f(k)). One running maximum S folds
        # candidate k=j via S <- max(S, prefix[j-1] - S).
        pre = list(accumulate(stones))
        best = pre[-1]
        for j in range(len(pre) - 1, 1, -1):
            best = max(best, pre[j - 1] - best)
        return best
