class Solution:
    def findLUSlength(self, a: str, b: str) -> int:
        # Identical strings have identical subsequence sets, so no string can
        # be a subsequence of exactly one of them.
        if a == b:
            return -1
        # Otherwise the longer string itself is the witness: every string is
        # a subsequence of itself, and a longer one cannot hide inside a
        # shorter.
        return max(len(a), len(b))
