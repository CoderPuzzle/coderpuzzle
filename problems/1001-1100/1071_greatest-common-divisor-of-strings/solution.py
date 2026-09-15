class Solution:
    def gcdOfStrings(self, str1: str, str2: str) -> str:
        # A common divisor string can only exist if the two strings agree
        # on their concatenation order; that is exactly the algebraic
        # signature of both being built from repetitions of one string.
        if str1 + str2 != str2 + str1:
            return ""
        # The largest such divisor is the prefix whose length is the GCD
        # of the two string lengths, found via the Euclidean algorithm.
        a, b = len(str1), len(str2)
        while b:
            a, b = b, a % b
        return str1[:a]
