class Solution:
    def reductionOperations(self, nums: List[int]) -> int:
        # Sorted ascending: crossing into a new (larger) distinct value
        # raises the level; element i costs its level = number of distinct
        # smaller values below it.
        s = sorted(nums)
        ans = 0
        level = 0
        for i in range(1, len(s)):
            if s[i] != s[i - 1]:
                level += 1
            ans += level
        return ans
