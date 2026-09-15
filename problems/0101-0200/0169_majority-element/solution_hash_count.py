class Solution:
    def majorityElement(self, nums: list[int]) -> int:
        # The premise taken literally: the answer turns up more than n / 2
        # times, so tally every value and stop at the first tally that
        # crosses half the array.
        counts: dict[int, int] = {}
        half = len(nums) // 2
        for num in nums:
            counts[num] = counts.get(num, 0) + 1
            # No value can be overtaken once a tally passes half: two values
            # cannot both hold more than half the positions.
            if counts[num] > half:
                return num
        # A majority is promised, so the sweep always returns mid-loop.
        raise AssertionError("unreachable: a majority is promised")
