class Solution:
    def integerBreak(self, n: int) -> int:
        # best[i]: the maximum product over all sums of two or more positive
        # integers totalling i. Build each i by choosing a first part j; the
        # remainder either stands whole as one part (the identity i - j, a
        # two-part sum) or breaks further (best[i - j], already two or more).
        best = [0] * (n + 1)
        best[1] = 1
        for i in range(2, n + 1):
            for j in range(1, i):
                # The inner max is the k >= 2 rule: i itself is never a legal
                # one-part product, only genuine splits enter the table.
                best[i] = max(best[i], j * max(best[i - j], i - j))
        return best[n]
