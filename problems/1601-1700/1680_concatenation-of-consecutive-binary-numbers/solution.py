class Solution:
    def concatenatedBinary(self, n: int) -> int:
        # Appending the L-bit binary form of i to a value v computes
        # v * 2^L + i, so a running residue carries the whole concatenation
        # without ever materializing it — at n = 10^5 the string already
        # spans 1,568,946 bits. L is i's bit length: it starts at 1 and
        # increments exactly when i is a power of two, i & (i - 1) == 0,
        # because only a newly set highest bit widens the run. The residue
        # stays below 2^30 and L at or below 17, so every intermediate stays
        # below 2^48 — trivial headroom for Python's integers, and the
        # reason the fixed-width solutions compute in 64-bit registers.
        MOD = 10**9 + 7
        result = 0
        length = 0
        for i in range(1, n + 1):
            if i & (i - 1) == 0:
                length += 1
            result = (result * (1 << length) + i) % MOD
        return result
