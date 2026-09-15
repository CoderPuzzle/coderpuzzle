class Solution:
    def sortColors(self, nums: list[int]) -> list[int]:
        # With only three keys the multiset fixes the output, so tally each
        # color into a slot indexed by the value itself.
        counts = [0, 0, 0]
        for value in nums:
            counts[value] += 1
        # Overwrite pass: emitting blocks 0,1,2 in order partitions nums;
        # safe because the tally above already captured every element.
        index = 0
        for color in range(3):
            for _ in range(counts[color]):
                nums[index] = color
                index += 1
        return nums
