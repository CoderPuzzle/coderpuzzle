from collections import defaultdict


class Solution:
    def distinctNumbers(self, nums: List[int], k: int) -> List[int]:
        # One frequency map slides with the window; the running count of
        # values whose frequency is nonzero is the answer per window.
        freq = defaultdict(int)
        distinct = 0
        ans = []
        for i, v in enumerate(nums):
            if freq[v] == 0:
                distinct += 1
            freq[v] += 1
            if i >= k:
                left = nums[i - k]
                freq[left] -= 1
                if freq[left] == 0:
                    distinct -= 1
            if i >= k - 1:
                ans.append(distinct)
        return ans
