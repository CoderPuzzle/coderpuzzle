class Solution:
    def maximumElementAfterDecrementingAndRearranging(self, arr: List[int]) -> int:
        # After sorting, each element can be raised to at most one more than
        # the previous; the answer is the running value min(prev + 1, v).
        arr.sort()
        cur = 1
        for v in arr[1:]:
            cur = min(cur + 1, v)
        return cur
