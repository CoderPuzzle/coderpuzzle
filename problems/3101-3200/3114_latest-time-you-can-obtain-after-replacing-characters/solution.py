class Solution:
    def findLatestTime(self, s: str) -> str:
        # Enumeration per the hint: try every one of the 12 * 60 legal times
        # in ascending order and keep the last pattern match; that last match
        # is the latest obtainable time.
        best = ""
        for hh in range(12):
            for mm in range(60):
                candidate = f"{hh:02d}:{mm:02d}"
                if all(p == "?" or p == c for p, c in zip(s, candidate)):
                    best = candidate
        return best
