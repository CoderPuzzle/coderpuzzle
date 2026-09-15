class Solution:
    def secondsToRemoveOccurrences(self, s: str) -> int:
        # A 1 crosses the run of zeros before it in exactly `zeros`
        # seconds, but cannot start until the previous 1 finished, so
        # each one raises the clock to max(ans + 1, zeros).
        ans = 0
        zeros = 0
        for c in s:
            if c == "0":
                zeros += 1
            elif zeros:
                ans = max(ans + 1, zeros)
        return ans
