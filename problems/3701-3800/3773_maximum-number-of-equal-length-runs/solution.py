class Solution:
    def maxSameLengthRuns(self, s: str) -> int:
        # One scan cuts s into maximal equal-letter runs; the answer is the
        # largest number of runs that share a single length.
        counts = {}
        n = len(s)
        i = 0
        while i < n:
            j = i
            while j < n and s[j] == s[i]:
                j += 1
            length = j - i
            counts[length] = counts.get(length, 0) + 1
            i = j
        return max(counts.values())
