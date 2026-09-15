class Solution:
    def maxActiveSectionsAfterTrade(self, s: str) -> int:
        # Augment with '1' at both ends, then run-length encode the result.
        # A trade turns an internal '1'-run (one '0'-run on each side) plus
        # both flanking '0'-runs into '1's, gaining their combined length.
        t = "1" + s + "1"
        total = s.count("1")
        runs = []
        i = 0
        while i < len(t):
            j = i
            while j < len(t) and t[j] == t[i]:
                j += 1
            runs.append(j - i)
            i = j
        # Runs alternate starting with '1', so the internal '1'-runs sit at
        # even indices 2, 4, ..., len(runs) - 3 with a '0'-run on each side.
        best = 0
        for k in range(2, len(runs) - 2, 2):
            best = max(best, runs[k - 1] + runs[k + 1])
        return total + best
