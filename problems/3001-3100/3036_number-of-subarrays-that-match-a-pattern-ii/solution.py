from typing import List


class Solution:
    def countMatchingSubarrays(self, nums: List[int], pattern: List[int]) -> int:
        # Reduce nums to its sign sequence s of length n - 1: s[t] is 1, 0,
        # or -1 according to nums[t + 1] vs nums[t]. Condition k of the
        # match definition is exactly s[i + k] == pattern[k], so the window
        # starting at i matches iff pattern occurs in s at offset i.
        # Counting windows becomes substring search, linear with the KMP
        # failure function.
        signs = [(later > earlier) - (later < earlier) for earlier, later in zip(nums, nums[1:])]
        m = len(pattern)
        # failure[k]: longest proper prefix of pattern that is also a
        # suffix of pattern[:k + 1].
        failure = [0] * m
        matched = 0
        for index in range(1, m):
            while matched > 0 and pattern[index] != pattern[matched]:
                matched = failure[matched - 1]
            if pattern[index] == pattern[matched]:
                matched += 1
            failure[index] = matched
        count = 0
        matched = 0
        for sign in signs:
            while matched > 0 and sign != pattern[matched]:
                matched = failure[matched - 1]
            if sign == pattern[matched]:
                matched += 1
            if matched == m:
                # Full occurrence; fall back so overlaps keep counting.
                count += 1
                matched = failure[matched - 1]
        return count
