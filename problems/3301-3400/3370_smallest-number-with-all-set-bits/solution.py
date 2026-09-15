class Solution:
    def smallestNumber(self, n: int) -> int:
        # Every number whose bits are all set has the form 2^t - 1. The
        # smallest such value that is >= n uses exactly as many bits as n
        # has: 2^bit_length(n) - 1 is the strictly greater power of two
        # minus one (hint 1). With n <= 1000 the result is at most 1023.
        return (1 << n.bit_length()) - 1
