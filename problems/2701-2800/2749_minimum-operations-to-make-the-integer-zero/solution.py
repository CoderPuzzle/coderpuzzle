class Solution:
    def makeTheIntegerZero(self, num1: int, num2: int) -> int:
        # After k operations num1 became num1 - k*num2 - (sum of k powers of
        # two), so reaching 0 means m = num1 - k*num2 is a sum of exactly k
        # powers of two. That holds iff popcount(m) <= k <= m: each term adds
        # at least 1, carrying equal terms only shrinks the term count down to
        # popcount(m), and splitting a 2^j into two 2^(j-1) raises it by one.
        for k in range(1, 61):
            m = num1 - k * num2
            if m >= k and bin(m).count("1") <= k:
                # Scanning upward makes the first hit the minimum.
                return k
        return -1
