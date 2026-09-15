class Solution:
    def minimumCost(self, s: str) -> int:
        # A prefix flip ending at i-1 (cost i) toggles exactly the left side
        # of border i, and a suffix flip starting at i (cost n-i) toggles
        # exactly its right side; so whenever s[i-1] != s[i], one of the two
        # runs an odd number of times -- pay the cheaper. Borders touch no
        # shared operation, making each fix independent.
        ans = 0
        n = len(s)
        for i in range(1, n):
            if s[i] != s[i - 1]:
                ans += min(i, n - i)
        return ans
