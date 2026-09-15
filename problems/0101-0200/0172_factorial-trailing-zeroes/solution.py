class Solution:
    def trailingZeroes(self, n: int) -> int:
        # Each trailing zero is a factor 10 = 2 * 5, and twos are never the
        # bottleneck in n! (every second factor brings one, only every fifth
        # a five), so the answer is exactly the count of factors of 5.
        # Legendre's sum: n // 5 credits each multiple of 5, n // 25 the
        # second five of every multiple of 25, and so on until power > n.
        count = 0
        power = 5
        while power <= n:
            count += n // power
            power *= 5
        return count
