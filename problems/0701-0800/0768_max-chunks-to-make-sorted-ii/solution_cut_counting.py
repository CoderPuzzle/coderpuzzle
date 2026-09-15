class Solution:
    def maxChunksToSorted(self, arr: list[int]) -> int:
        # A boundary is legal exactly when the prefix's largest entry is
        # no greater than every entry after the cut — non-strict, which
        # is what keeps repeated values legal at equal boundaries.
        suffix_min = list(arr)
        for i in range(len(arr) - 2, -1, -1):
            suffix_min[i] = min(suffix_min[i], suffix_min[i + 1])
        blocks = 1
        prefix_max = arr[0]
        for i in range(1, len(arr)):
            # The prefix holds the smallest i+1 entries exactly when its
            # running maximum does not exceed the suffix minimum.
            if prefix_max <= suffix_min[i]:
                blocks += 1
            prefix_max = max(prefix_max, arr[i])
        return blocks
