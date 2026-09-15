class Solution:
    def minOperations(self, s: str) -> int:
        # A proper substring cannot sort a length-two string, so a
        # descending pair is impossible; otherwise the answer is decided
        # by where the smallest and largest characters appear.
        n = len(s)
        if all(s[i] <= s[i + 1] for i in range(n - 1)):
            return 0
        if n == 2:
            return -1
        mn = min(s)
        mx = max(s)
        if s[0] == mn or s[-1] == mx:
            return 1
        for i in range(1, n - 1):
            if s[i] == mn or s[i] == mx:
                return 2
        return 3
