from bisect import bisect_right


class Solution:
    def answerQueries(self, nums: List[int], queries: List[int]) -> List[int]:
        # The longest subsequence under a sum cap uses the smallest
        # elements: sort, prefix-sum, then count prefixes <= query by
        # binary search (first index whose prefix exceeds the query).
        nums.sort()
        prefix = []
        total = 0
        for value in nums:
            total += value
            prefix.append(total)
        return [bisect_right(prefix, q) for q in queries]
