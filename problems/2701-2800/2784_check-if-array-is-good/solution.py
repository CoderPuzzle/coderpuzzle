class Solution:
    def isGood(self, nums: List[int]) -> bool:
        # A permutation of base[m] has maximum m and length m + 1, so the
        # maximum leaves exactly one candidate array to match. Sort a copy
        # of nums and compare it against the literally constructed
        # [1, ..., m - 1, m, m]. For m = 1 the ascending range is empty and
        # the expected array is just [1, 1], which is base[1] itself.
        largest = max(nums)
        if len(nums) != largest + 1:
            # base[m] has length m + 1; a disagreement rules out every base.
            return False
        expected = list(range(1, largest)) + [largest, largest]
        return sorted(nums) == expected
