class Solution:
    def longestBalanced(self, s: str) -> int:
        # Fixing the left end and growing the right one adds a single letter
        # per step, so the count array, the number of live letters, and the
        # largest count among them all update in constant time. Counts only
        # rise within one sweep, so the max is exact after each increment.
        n = len(s)
        best = 0
        for i in range(n):
            counts = [0] * 26
            distinct = 0
            top = 0
            for j in range(i, n):
                c = ord(s[j]) - ord("a")
                if counts[c] == 0:
                    distinct += 1
                counts[c] += 1
                if counts[c] > top:
                    top = counts[c]
                # The counts sum to the window length, so they are all equal
                # exactly when their common value times the number of live
                # letters fills the length; a single live letter always wins.
                if distinct * top == j - i + 1:
                    best = max(best, j - i + 1)
        return best
