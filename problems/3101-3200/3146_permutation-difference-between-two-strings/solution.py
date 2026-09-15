class Solution:
    def findPermutationDifference(self, s: str, t: str) -> int:
        # Every character occurs exactly once in each string, so its share
        # of the sum is fixed by the two positions alone: one pass records
        # where each letter sits in s, and one pass over t reduces every
        # term to a lookup plus an absolute difference.
        pos = [0] * 26
        for i, c in enumerate(s):
            pos[ord(c) - ord("a")] = i
        return sum(abs(i - pos[ord(c) - ord("a")]) for i, c in enumerate(t))
